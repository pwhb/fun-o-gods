import { DB_NAME } from "$env/static/private";
import DBKeys from "$lib/consts/DBKeys";
import clientPromise from "$lib/mongodb";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { validateRegister } from "$lib/validators/auth";
import { hash } from "argon2";


export const POST: RequestHandler = async ({ request }) =>
{
    try
    {
        const { username, password, confirmPassword } = await request.json();
        const { ok, invalid, previous } = validateRegister({ username, password, confirmPassword });

        if (!ok)
        {
            return json({ success: false, data: { invalid, previous } }, { status: 400 });
        }
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(DBKeys.UserCollection);
        const alreadyExists = await col.findOne({ username });
        if (alreadyExists)
        {
            invalid.username = 'username already exists';
            return json({ success: false, data: { invalid, previous } }, { status: 400 });
        }


        const hashedPassword = await hash(password as string);
        const dbRes = await col.insertOne({
            username,
            password: hashedPassword,
            role: "user",
            activated: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return json({ success: true, data: dbRes }, { status: 201 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};