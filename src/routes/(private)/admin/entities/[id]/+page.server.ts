import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { ObjectId } from "mongodb";
import { serialize } from "$lib/helpers/format";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) =>
{
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const doc = await db.collection(DBKeys.EntityCollection).findOne({ _id: new ObjectId(id) });


    return {
        doc: serialize(doc),
    };
};