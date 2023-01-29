import { getUser } from "$lib/auth/getUser";
import { getCollection } from "$lib/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export const POST: RequestHandler = async ({ url, request }) => {
    const user = await getUser(request);

    if (!user) {
        return json({
            message: "You are not authenticated",
        }, {
            status: 401,
        })
    }

    const postId = url.searchParams.get("postId");

    if (!postId || !user.uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const likes = await getCollection("likes");

    const existingLike = await likes.findOne({
        postId: new ObjectId(postId),
        uid: user.uid,
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
        postId: new ObjectId(postId),
        uid: user.uid,
    })

    return json({}, {
        status: 201,
    });
}

export const DELETE: RequestHandler = async ({ url, request }) => {
    const user = await getUser(request);

    if (!user) {
        return json({
            message: "You are not authenticated",
        }, {
            status: 401,
        })
    }
    const { uid } = user;
    const postId = url.searchParams.get("postId");

    if (!postId || !uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const likes = await getCollection("likes");

    const existingLike = await likes.findOne({
        postId: new ObjectId(postId),
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
        postId: new ObjectId(postId),
        uid: uid,
    })

    return json({}, {
        status: 201,
    });
}