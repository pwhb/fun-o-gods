import { redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";

const logout: Action = async ({ cookies }) =>
{
    cookies.delete("token");
    throw redirect(302, '/');
};

export const actions: Actions = {
    default: logout
};