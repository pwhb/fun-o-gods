import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { list, upload } from "$lib/s3";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) =>
{
    try
    {
        const filter: any = getQuery(url.searchParams);

        const aws = await list();
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.UploadCollection);
        const docs = await col.find(filter).toArray();
        return json({ success: true, data: docs, aws: aws?.Contents, total1: docs.length, total2: aws }, { status: 201 });
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
        const form = await request.formData();
        const file: Blob = form.get('file') as any;
        const data = await file.arrayBuffer();

        const Key = `${new Date().valueOf()}_${file.name}`;

        const params = {
            Key: Key,
            Body: Buffer.from(data),
            ContentType: file.type
        };
        const res = await upload(params);
        if (!res)
        {
            throw new Error('upload failed');
        }

        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.UploadCollection);
        const dbRes = await col.insertOne({
            Key: Key,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return json({ success: true, data: dbRes }, { status: 201 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};