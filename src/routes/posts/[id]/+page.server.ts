import { getCollection } from "$lib/mongo";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const posts = await getCollection("posts")

    const post = await posts.findOne({ _id: new ObjectId(id) });

    if (!post) {
        throw error(404, "Post not found");
    }

    return {
        ...post,
        _id: post._id.toString(),
    };
}