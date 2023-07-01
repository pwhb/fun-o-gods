import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import { serialize } from "$lib/helpers/format";
import clientPromise from "$lib/mongodb";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) =>
{
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const publicConfig = await db
        .collection(DBKeys.ConfigCollection)
        .findOne({ name: "public" }, {
            projection: {}
        });

    return {
        user: serialize(locals.user),
        publicConfig: serialize(publicConfig),
    };
};