import { getCollection } from "$lib/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ url }) => {
    const postId = url.searchParams.get("postId");
    const uid = url.searchParams.get("uid");

    if (!postId || !uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const col = await getCollection("likes");

    const ref = await col.findOne({
        postId: postId,
        uid: uid,
    });

    if (ref) {
        return json({
            message: "Already liked",
        }, {
            status: 400,
        })
    }

    await col.insertOne({
        postId: postId,
        uid: uid,
        addedAt: new Date(),
    })

    return json({}, {
        status: 201,
    })
}