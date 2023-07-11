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
    const doc = (await db.collection(DBKeys.StoryCollection).aggregate([
        {
            $match: { _id: new ObjectId(id) }
        },
        {
            $lookup: {
                from: 'genres',
                localField: 'genres',
                foreignField: '_id',
                as: 'genres'
            }
        },
        {
            $limit: 1
        }
    ]).toArray())[0];
    const scenes = await db.collection(DBKeys.SceneCollection).find({ story: doc?._id, active: true }).toArray();

    return {
        doc: serialize(doc),
        scenes: serialize(scenes),
    };
};