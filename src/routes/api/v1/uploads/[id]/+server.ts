import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import type { IUpload } from "$lib/models/upload";
import clientPromise from "$lib/mongodb";
import { get, remove } from "$lib/s3";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export const GET: RequestHandler = async ({ params }) =>
{
    try
    {
        const { id } = params;
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.UploadCollection);
        const doc = await col.findOne({ _id: new ObjectId(id) }) as IUpload;
        if (!doc)
        {
            return json({ success: false, error: "not found" }, { status: 404 });
        }
        const res = (await get(doc.Key)) as any;

        return new Response(res?.Body, {
            headers: { 'Content-Type': res?.ContentType }
        });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};

export const DELETE: RequestHandler = async ({ params }) =>
{
    try
    {
        const { id } = params;
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.UploadCollection);
        const doc = await col.findOne({ _id: new ObjectId(id) }) as IUpload;
        const res = await remove(doc.Key);
        const dbRes = await col.deleteOne({ _id: new ObjectId(id) });
        console.log({ res, dbRes });
        return json({ success: true });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};
