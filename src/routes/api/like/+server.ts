import { getCollection } from "$lib/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

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

    const likes = await getCollection("likes");

    const existingLike = await likes.findOne({
        postId: postId,
        uid: uid,
    });

    if (existingLike) {
        return json({
            message: "You already liked this post",
        }, {
            status: 400,
        })
    }

    const col = await getCollection("posts");
    await col.updateOne({
        _id: new ObjectId(postId),
    }, {
        $inc: {
            likes: 1,
        },
    })

    likes.insertOne({
        postId: postId,
        uid: uid,
    })

    return json({}, {
        status: 201,
    });
}

export const DELETE: RequestHandler = async ({ url }) => {
    const postId = url.searchParams.get("postId");
    const uid = url.searchParams.get("uid");

    if (!postId || !uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const likes = await getCollection("likes");

    const existingLike = await likes.findOne({
        postId: postId,
        uid: uid,
    });

    if (!existingLike) {
        return json({
            message: "You haven't liked this post",
        }, {
            status: 400,
        })
    }

    const col = await getCollection("posts");
    await col.updateOne({
        _id: new ObjectId(postId),
    }, {
        $inc: {
            likes: -1,
        },
    })

    likes.deleteOne({
        postId: postId,
        uid: uid,
    })

    return json({}, {
        status: 201,
    });
}