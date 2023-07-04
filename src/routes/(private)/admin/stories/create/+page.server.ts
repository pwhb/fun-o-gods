import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { serialize } from "$lib/helpers/format";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) =>
{
    return {

    };
};