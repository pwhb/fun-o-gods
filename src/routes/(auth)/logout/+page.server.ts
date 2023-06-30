import { redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";

const logout: Action = async ({ cookies }) =>
{
    cookies.delete("token");
    throw redirect(302, '/home');
};

export const actions: Actions = {
    default: logout
};