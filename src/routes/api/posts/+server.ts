
import clientPromise, { getCollection } from "$lib/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request }) => {
    const { url, description, uid } = await request.json();

    if (!url || !description) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }
    const posts = await getCollection("posts");

    await posts.insertOne({
        url: url,
        description: description,
        uid: uid,
        addedAt: new Date(),
        likes: 0,
    })

    return json({}, {
        status: 201,
    })
}

export const GET: RequestHandler = async () => {
    const posts = await getCollection("posts");
    const data = await posts.find().sort({ addedAt: -1 }).limit(20).toArray();

    return json(data);
}