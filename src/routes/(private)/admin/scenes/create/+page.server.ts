import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { ObjectId } from "mongodb";
import { serialize } from "$lib/helpers/format";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) =>
{

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const stories = await db.collection(DBKeys.StoryCollection).find({ creator: locals.user._id, active: true }).toArray();
    return {
        stories: serialize(stories),
    };
};