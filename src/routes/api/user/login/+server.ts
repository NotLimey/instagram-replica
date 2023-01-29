import { getCollection } from "$lib/mongo";
import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
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