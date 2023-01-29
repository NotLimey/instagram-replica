import { getUser } from "$lib/auth/getUser";
import { getCollection } from "$lib/mongo";
import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { RequestHandler } from "../$types";

export const POST: RequestHandler = async ({ request, url }) => {
    const user = await getUser(request);

    if (!user) {
        return json({
            message: "You are not authenticated",
        }, {
            status: 401,
        })
    }

    const postId = url.searchParams.get("postId");
    const { message } = await request.json();

    if (!message || !postId) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const comments = await getCollection("comments");

    await comments.insertOne({
        message: message,
        uid: user.uid,
        addedAt: new Date(),
        postId: new ObjectId(postId),
    })

    return json({}, {
        status: 201,
    })
}