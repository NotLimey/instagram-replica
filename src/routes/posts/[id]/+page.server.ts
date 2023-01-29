import { getCollection } from "$lib/mongo";
import { error } from "@sveltejs/kit";
import { get } from "../../../queries/post/post";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const posts = await getCollection("posts")

    // get post and first 20 comments for the post
    const post = await posts.aggregate(get(id)).next();

    if (!post) {
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