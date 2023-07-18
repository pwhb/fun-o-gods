import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import { serialize } from "$lib/helpers/format";
import clientPromise from "$lib/mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () =>
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(DBKeys.SceneCollection);
    const docs = await col.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'creator'
            }
        },
        {
            $addFields: {
                creator: { $arrayElemAt: ['$creator', 0] }
            }
        },
        {
            $lookup: {
                from: 'stories',
                localField: 'story',
                foreignField: '_id',
                as: 'story'
            }
        },
        {
            $addFields: {
                story: { $arrayElemAt: ['$story', 0] }
            }
        },
    ]).toArray();
    return {
        scenes: serialize(docs)
    };
};