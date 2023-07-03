import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import { getQuery, getSort } from "$lib/helpers/request";
import clientPromise from "$lib/mongodb";

import { type RequestHandler, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) =>
{
    try
    {
        const sort = getSort(url.searchParams);
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.StoryCollection);
        const docs = await col.find({}, { sort: sort }).toArray();
        return json({ success: true, data: docs }, { status: 201 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};

export const POST: RequestHandler = async ({ request }) =>
{
    try
    {
        const body = await request.json();
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.StoryCollection);

        const dbRes = await col.insertOne({
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return json({ success: true, data: dbRes }, { status: 201 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};