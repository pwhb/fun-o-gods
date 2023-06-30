import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import clientPromise from "$lib/mongodb";
import { hash } from 'argon2';
import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import { validateRegister } from "$lib/validators/auth";
import { getJwt } from "$lib/jwt";

export const load: PageServerLoad = async ({ locals }) =>
{
    if (locals.user)
    {
        throw redirect(302, "/admin");
    }

};

const register: Action = async ({ request, cookies }) =>
{
    const data = await request.formData();
    const { username, password, confirmPassword } = Object.fromEntries(data);
    const { ok, invalid, previous } = validateRegister({ username, password, confirmPassword });

    if (!ok)
    {
        return fail(400, { invalid, previous });
    }

    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(DBKeys.UserCollection);
    const alreadyExists = await col.findOne({ username });
    if (alreadyExists)
    {
        invalid.username = 'username already exists';
        return fail(400, { invalid, previous });
    }

    const hashedPassword = await hash(password as string);
    await col.insertOne({
        username,
        password: hashedPassword,
        role: "user",
        activated: false,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    // const token = getJwt({
    //     username: username,
    //     role: "user"
    // });

    // cookies.set("token", token, {
    //     httpOnly: true,
    //     path: '/',
    //     secure: true,
    //     sameSite: 'strict',
    //     maxAge: 60 * 60 * 24 // 1 day
    // });

    throw redirect(303, '/home');
};

export const actions: Actions = {
    default: register
};