import { getCollection } from "$lib/mongo";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const posts = await getCollection("posts")

    // get post and first 20 comments for the post
    const post = await posts.aggregate([
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
        // get all comments on the post and sort them by date, also get the user who posted the comment
        {
            $lookup: {
                from: "comments",
                let: { postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$postId", "$$postId"],
                            },
                        },
                    },
                    {
                        $sort: {
                            addedAt: -1,
                        },
                    },
                    {
                        $limit: 20,
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "uid",
                            foreignField: "uid",
                            as: "user",
                        },
                    },
                    {
                        $addFields: {
                            user: { $arrayElemAt: ["$user", 0] },
                        },
                    },
                ],
                as: "comments",
            },
        },
        // also get the user who posted the post
        {
            $lookup: {
                from: "users",
                localField: "uid",
                foreignField: "uid",
                as: "user",
            },
        },
        {
            $addFields: {
                user: { $arrayElemAt: ["$user", 0] },
            },
        },

    ]).next();


    if (!post) {
        console.log("Post not found")
        throw error(404, "Post not found");
    }

    const data = {
        ...post,
        _id: post._id.toString(),
        comments: post.comments.map((comment: any) => ({
            ...comment,
            _id: comment._id.toString(),
            postId: comment.postId.toString(),
            user: {
                ...comment.user,
                _id: comment.user._id.toString(),
            }
        })),
        user: {
            ...post.user,
            _id: post.user._id.toString(),
        },
    };
    return data
}