import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { validateLogin } from "$lib/validators/auth";
import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { verify } from "argon2";
import { getJwt } from "$lib/jwt";

export const load: PageServerLoad = async ({ locals }) =>
{
    if (locals.user)
    {
        throw redirect(302, "/admin");
    }

};

const login: Action = async ({ request, cookies }) =>
{


    const data = await request.formData();
    const { username, password } = Object.fromEntries(data);
    const { ok, invalid, previous } = validateLogin({ username, password });
    if (!ok)
    {
        return fail(400, { invalid, previous });
    }

    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(DBKeys.UserCollection);
    const alreadyExists = await col.findOne({ username });
    if (!alreadyExists)
    {
        invalid.username = 'user does not exist';
        return fail(400, { invalid, previous });
    }
    if (!alreadyExists.active)
    {
        invalid.username = 'user is not activated';
        return fail(400, { invalid, previous });
    }

    const isCorrect = await verify(alreadyExists.password, password as string);

    if (!isCorrect)
    {
        invalid.password = 'wrong password';
        return fail(400, { invalid, previous });
    }

    const token = getJwt({
        id: alreadyExists._id
    });

    cookies.set("token", token, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
    });

    throw redirect(303, '/admin');
};

export const actions: Actions = {
    default: login
};