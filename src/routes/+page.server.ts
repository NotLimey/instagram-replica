import { getCollection } from "$lib/mongo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const posts = await getCollection("posts");

    // get all posts and documents in the likes collection that match the postId field
    const data = await posts.find().sort({ addedAt: -1 }).limit(20).toArray();

    return {
        // posts: data,
        posts: data.map(x => ({
            ...x,
            addedAt: x.addedAt.toISOString(),
            _id: x._id.toString(),
        }))
    };
}