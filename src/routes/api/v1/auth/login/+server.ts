import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { verify } from "argon2";
import { getJwt } from "$lib/jwt";
import { validateLogin } from "$lib/validators/auth";

export const POST: RequestHandler = async ({ request }) =>
{
    try
    {
        const { username, password } = await request.json();
        const { ok, invalid, previous } = validateLogin({ username, password });

        if (!ok)
        {
            return json({ success: false, data: { invalid, previous } }, { status: 400 });
        }

        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.UserCollection);

        const alreadyExists = await col.findOne({ username });
        if (!alreadyExists)
        {
            return json({ success: true, data: { message: "no user found" } }, { status: 404 });
        }
        if (!alreadyExists.active)
        {
            invalid.username = 'user is not activated';
            return json({ success: false, data: { invalid, previous } }, { status: 400 });
        }
        const isCorrect = await verify(alreadyExists.password, password as string);

        if (!isCorrect)
        {
            return json({ success: true, data: { message: "password is incorrect" } }, { status: 400 });
        }
        const token = getJwt({
            id: alreadyExists._id
        });

        return json({
            success: true, data: {
                username: alreadyExists.username,
                role: alreadyExists.role,
                token
            }
        }, { status: 200 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};
