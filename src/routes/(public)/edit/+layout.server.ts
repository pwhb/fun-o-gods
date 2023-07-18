import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { serialize } from "$lib/helpers/format";


export const load: LayoutServerLoad = async ({ locals }) =>
{
    if (!locals.user)
    {
        throw redirect(302, '/auth/login');
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const userInfo = await db
        .collection(DBKeys.UserCollection)
        .findOne({ username: locals.user.username }, { projection: { password: 0 } });
    return {
        userInfo: serialize(userInfo)
    };
};