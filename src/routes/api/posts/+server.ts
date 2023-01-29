
import { getUser } from "$lib/auth/getUser";
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

export const GET: RequestHandler = async ({ url, request }) => {
    const user = await getUser(request);

    if (!user) {
        return json({
            message: "You are not authenticated",
        }, {
            status: 401,
        })
    }

    const skip = url.searchParams.get("skip");
    const uid = url.searchParams.get("uid");

    if (!uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const SKIP = skip ? parseInt(skip) : 0;

    const posts = await getCollection("posts");

    console.log(uid)

    // get posts but also check if the user has liked the post likes can be found in the likes collection. all values in likes document are strings. Return a boolean
    const data = await posts.aggregate([
        {
            $lookup: {
                from: "likes",
                let: { postId: "$_id", uid: uid },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$postId", "$$postId"] },
                                    { $eq: ["$uid", "$$uid"] },
                                ]

                            }
                        }
                    }
                ],
                as: "liked"
            }
        },
        {
            $addFields: {
                liked: { $gt: [{ $size: "$liked" }, 0] }
            }
        },
        { $sort: { addedAt: -1 } },
        { $skip: SKIP },
        { $limit: 20 },
    ]).toArray();


    // const data = await posts.find().sort({ addedAt: -1 }).skip(SKIP).limit(20).toArray();

    return json(data);
}