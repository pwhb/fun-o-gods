import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import { serialize } from "$lib/helpers/format";
import clientPromise from "$lib/mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () =>
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(DBKeys.UploadCollection);
    const docs = await col.find({}, { sort: { label: 1 } }).toArray();
    return {
        uploads: serialize(docs)
    };
};