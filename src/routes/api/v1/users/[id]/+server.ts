import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export const PUT: RequestHandler = async ({ request, params, locals }) =>
{
    try
    {
        const { id } = params;
        const body = await request.json();
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.UserCollection);

        const dbRes = await col.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                username: body.username,
                role: body.role,
                active: body.active,
                updatedAt: new Date(),
            }
        });

        return json({ success: true, data: dbRes }, { status: 201 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};