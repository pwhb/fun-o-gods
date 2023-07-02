import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export const GET: RequestHandler = async ({ params }) =>
{
    try
    {
        const { id } = params;
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.EntityCollection);
        const doc = await col.findOne({
            $or: [
                { _id: ObjectId.isValid(id as string) ? new ObjectId(id) : new ObjectId() },
                { name: id }
            ]
        });
        if (!doc)
        {
            return json({ success: false, error: "not found" }, { status: 404 });
        }
        return json({ success: true, data: doc }, { status: 200 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};

export const PUT: RequestHandler = async ({ request, params }) =>
{
    try
    {
        const { id } = params;
        const body = await request.json();
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.EntityCollection);
        const dbRes = await col.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                name: body.name,
                icon: body.icon,
                config: body.config,
                updatedAt: new Date()
            }
        });

        return json({ success: true, data: dbRes });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};
