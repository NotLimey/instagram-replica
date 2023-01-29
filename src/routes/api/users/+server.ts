import { getCollection } from "$lib/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, url }) => {
    const q = url.searchParams.get("query");

    if (!q) return json({ message: "Missing required fields" }, { status: 400 });

    const users = await getCollection("users");

    // find users where either email, username or name contains the query
    const results = await users.find({
        $or: [
            { email: { $regex: q, $options: "i" } },
            { userName: { $regex: q, $options: "i" } },
            { displayName: { $regex: q, $options: "i" } },

        ],
    }).limit(10).toArray();

    return json(results, {
        status: 200,
        headers: {
            "Cache-Control": "max-age=3600",
        },
    });
}