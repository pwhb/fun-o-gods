import { fetchData } from "$lib/api/common";
import DBKeys from "$lib/consts/DBKeys";
import { serialize } from "$lib/helpers/format";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) =>
{
    return {
        user: locals.user ? serialize(locals.user) : null,
    };
};