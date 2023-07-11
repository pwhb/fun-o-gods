import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions, PageServerLoad } from "./$types";
import { validateChangePassword, validateLogin } from "$lib/validators/auth";
import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { hash, verify } from "argon2";
import { getJwt } from "$lib/jwt";

export const load: PageServerLoad = async ({ locals }) =>
{
    if (!locals.user)
    {
        throw redirect(302, '/auth/login');
    }
};

const changePassword: Action = async ({ request, locals }) =>
{


    const data = await request.formData();
    const { password, newPassword, confirmPassword } = Object.fromEntries(data);

    const { ok, invalid, previous } = validateChangePassword({ newPassword, confirmPassword });
    if (!ok)
    {
        return fail(400, { invalid, previous });
    }



    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(DBKeys.UserCollection);
    const alreadyExists = await col.findOne({ _id: locals.user._id });
    if (!alreadyExists)
    {
        invalid.password = 'user does not exist';
        return fail(400, { invalid, previous });
    }


    const isCorrect = await verify(alreadyExists.password, password as string);

    if (!isCorrect)
    {
        invalid.password = 'wrong password';
        return fail(400, { invalid, previous });
    }
    const hashedPassword = await hash(newPassword as string);

    const dbRes = await col.findOneAndUpdate({ _id: locals.user._id }, {
        $set: {
            password: hashedPassword,
            updatedAt: new Date(),
        }
    });

    throw redirect(303, '/edit/settings');
};

export const actions: Actions = {
    default: changePassword
};