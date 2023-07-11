import { redirect } from "@sveltejs/kit";
import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { serialize } from "$lib/helpers/format";
import type { PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";


export const load: PageServerLoad = async ({ locals, params }) =>
{
    try
    {

        const { id } = params;
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const doc = await db
            .collection(DBKeys.StoryCollection)
            .aggregate([
                {
                    $match: { _id: new ObjectId(id) }
                },
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
                        from: 'genres',
                        localField: 'genres',
                        foreignField: '_id',
                        as: 'genres'
                    }
                },
                {
                    $project: {
                        "creator.password": 0
                    }
                },
                {
                    $limit: 1
                }
            ]).toArray();
        return {
            story: serialize(doc[0])
        };
    } catch (e)
    {
        console.error(e);
        return {};

    }
};