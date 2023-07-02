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

    if (locals.user.role === 'guest')
    {
        throw redirect(302, '/home');
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const entities = await db.collection(DBKeys.EntityCollection).find({}, {
        projection: {
            name: 1,
            icon: 1,
            access: "$config.operations.read"
        },
        sort: {
            name: 1
        }
    }).toArray();

    return {
        menuItems: serialize(entities)
    };
};