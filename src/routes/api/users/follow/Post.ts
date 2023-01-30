import { getUser } from "$lib/auth/getUser";
import { getCollection } from "$lib/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";

export const Post: RequestHandler = async ({ request, url }) => {
    const user = await getUser(request);

    if (!user) {
        return json({
            message: "You are not authenticated",
        }, {
            status: 401,
        })
    }

    const uid = url.searchParams.get("uid");

    if (!uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const users = await getCollection("users");

    const existingUser = await users.findOne({
        uid: uid,
    });

    if (!existingUser) {
        return json({
            message: "User does not exist",
        }, {
            status: 400,
        })
    }

    const followingCol = await getCollection("following");

    const following = await followingCol.findOne({
        uid: user.uid,
        following: uid,
    });

    if (following) {
        return json({
            message: "You are already following this user",
        }, {
            status: 400,
        })
    }

    await followingCol.insertOne({
        uid: user.uid,
        following: uid,
        addedAt: new Date(),
    });

    return json({}, {
        status: 201,
    })
}