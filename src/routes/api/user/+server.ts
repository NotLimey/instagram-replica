import { getCollection } from "$lib/mongo";
import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, url }) => {

    const col = await getCollection("users");

    const { displayName, photoURL, uid, email } = await request.json();

    if (!displayName || !photoURL || !uid || !email) {
        return json({
            message: "Missing required fields",
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
            uid: uid
        }
    }, {
        upsert: true,
    })

    return json({}, {
        status: 201,
    })
}