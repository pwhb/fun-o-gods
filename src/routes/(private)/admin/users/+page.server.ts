import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import { serialize } from "$lib/helpers/format";
import clientPromise from "$lib/mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () =>
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(DBKeys.UserCollection);
    const docs = await col.find({}, { projection: { password: 0 } }).toArray();
    return {
        users: serialize(docs)
    };
};