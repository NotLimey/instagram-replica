import { getCollection } from "$lib/mongo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { username } = params;

    const users = await getCollection("users");

    // get user and their following count also their followers count
    // following document exists of uid and following(uid)
    const user = await users.findOne({
        userName: username,
    });

    if (!user) {
        return {
            status: 404,
        }
    }

    const following = await getCollection("following");

    const followingCount = await following.countDocuments({
        following: user.uid,
    });

    const followersCount = await following.countDocuments({
        uid: user.uid,
    });

    const posts = await getCollection("posts");

    const userPosts = await posts.find({
        uid: user.uid,
    }).toArray();

    return {
        posts: userPosts.map(post => ({
            ...post,
            _id: post._id.toString(),
        })),
        user: {
            ...user,
            _id: user._id.toString(),
            following: followersCount,
            followers: followingCount,
        },
    }
}