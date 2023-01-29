import { getUser } from "$lib/auth/getUser";
import { getCollection } from "$lib/mongo";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ request, url }) => {
    const user = await getUser(request);

    if (!user) {
        return json(
            {
                message: "You are not authenticated",
            },
            {
                status: 401,
            }

        )
    };

    const users = await getCollection("users");

    const { uid } = user;

    const existingUser = await users.findOne({
        uid: uid,
    });

    if (!existingUser) {
        return json(
            {
                message: "User does not exist",
            },
            {
                status: 400,
            }

        )
    }

    return json(existingUser)
}