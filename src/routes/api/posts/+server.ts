
import clientPromise from "$lib/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request }) => {
    const { url, description } = await request.json();

    if (!url || !description) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const client = await clientPromise;
    const db = client.db("TestingMangoDb");

    await db.collection("posts").insertOne({
        url: url,
        description: description,
        addedAt: new Date(),
    })

    return json({}, {
        status: 201,
    })
}