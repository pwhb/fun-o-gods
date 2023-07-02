
import { DB_NAME } from '$env/static/private';
import { decodeJwt } from '$lib/jwt';
import clientPromise from '$lib/mongodb';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { ObjectId } from 'mongodb';

const authMiddleware: Handle = async ({ event, resolve }) =>
{
	let token = event.cookies.get('token');

	if (!token)
	{
		const authHeader = event.request.headers.get('Authorization');

		if (!authHeader)
		{
			return await resolve(event);
		}

		const [Bearer, tokenFromHeader] = authHeader.split(' ');
		if (Bearer !== 'Bearer' || !tokenFromHeader)
		{
			return await resolve(event);
		}
		token = tokenFromHeader;
	}

	const decoded = decodeJwt(token) as any;
	if (!decoded)
	{
		return await resolve(event);
	}

	try
	{
		const client = await clientPromise;
		const db = client.db(DB_NAME);
		const col = db.collection('users');
		const pipeline = [
			{ $match: { _id: new ObjectId(decoded.id) } },
			{
				$lookup: {
					from: 'roles',
					localField: 'role',
					foreignField: 'name',
					as: 'roleInfo'
				}
			},
			{
				$addFields: {
					roleInfo: { $arrayElemAt: ['$roleInfo', 0] }
				}
			},
			{
				$project: {
					username: 1,
					role: 1,
					avatar: 1,
					"roleInfo.level": 1
				}
			},
			{ $limit: 1 }
		];
		const user = (await col.aggregate(pipeline).toArray())[0] as any;

		event.locals.user = user;
	} catch (err)
	{
		console.error(err);
	}


	return await resolve(event);
};

export const handle = sequence(authMiddleware);
