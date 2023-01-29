import { getCollection } from "$lib/mongo";
import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { RequestHandler } from "../$types";

export const POST: RequestHandler = async ({ request, url }) => {

    const col = await getCollection("users");

    const { displayName, photoURL, uid, email, userName } = await request.json();

    if (!displayName || !photoURL || !uid || !email) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    // find user with same uid or same userName
    const existingUser = await col.findOne({
        $or: [
            { uid: uid },
            { userName: userName },
        ]
    });

    if (existingUser) {
        return json({
            message: "User already exists",
        }, {
            status: 400,
        })
    }

    await col.updateOne({
        uid: uid,
    }, {
        $set: {
            displayName: displayName,
            photoURL: photoURL,
            email: email,
            uid: uid,
        }
    }, {
        upsert: true,
    })

    return json({}, {
        status: 201,
    })
}