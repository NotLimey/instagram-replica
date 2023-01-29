import { auth } from "$lib/admin";
import { getCollection } from "$lib/mongo";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";

export const POST: RequestHandler = async ({ request, url }) => {

    const col = await getCollection("users");

    const { uid } = await request.json();

    if (!uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const existingUser = await col.findOne({
        uid: uid,
    });

    if (!existingUser) {
        await auth.deleteUser(uid);

        return json({
            message: "User does not exist",
        }, {
            status: 400,
        })
    }

    return json({}, {
        status: 201,
    })
}