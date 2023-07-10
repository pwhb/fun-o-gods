import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { ObjectId } from "mongodb";
import { serialize } from "$lib/helpers/format";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) =>
{
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const doc = await db.collection(DBKeys.SceneCollection).findOne({ _id: new ObjectId(id) });

    const stories = await db.collection(DBKeys.StoryCollection).find({ creator: locals.user._id, active: true }).toArray();
    const scenes = await db.collection(DBKeys.SceneCollection).find({
        $and: [
            { story: doc!.story, active: true },
            { _id: { $ne: doc?._id } }
        ]
    }).toArray();
    return {
        doc: serialize(doc),
        stories: serialize(stories),
        scenes: serialize(scenes)
    };
};