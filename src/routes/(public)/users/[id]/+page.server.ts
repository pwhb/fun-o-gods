import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";
import { serialize } from "$lib/helpers/format";

export const load: PageServerLoad = async ({ params }) =>
{
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const userInfo = await db
        .collection(DBKeys.UserCollection)
        .findOne({ username: id }, { projection: { password: 0 } });
    return {
        userInfo: serialize(userInfo)
    };
};

