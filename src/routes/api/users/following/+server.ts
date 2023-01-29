import { getCollection } from "$lib/mongo";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ request, url }) => {
    const following = await getCollection("following");

    const docs = await following.find().limit(100).toArray();

    return json(docs)
}