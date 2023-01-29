
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
    const uid = user.uid;

    if (!uid) {
        return json({
            message: "Missing required fields",
        }, {
            status: 400,
        })
    }

    const SKIP = skip ? parseInt(skip) : 0;

    const posts = await getCollection("posts");

    // get posts but also check if the user has liked the post likes can be found in the likes collection. all values in likes document are strings. Return a boolean
    // also get the user who posted the post
    // only get posts of users that the current user is following. you can get the accounts the user follows from collection following. where uid is the current user uid

    const following = await getCollection("following");
    const follows = await following.find({ uid: uid }).map(x => x.following).toArray();

    const data = await posts.aggregate([
        {
            $match: {
                uid: { $in: [...follows, uid] }

            },
        },
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
        {
            $lookup: {
                from: "users",
                localField: "uid",
                foreignField: "uid",
                as: "user"
            },
        },
        {
            $addFields: {
                user: { $arrayElemAt: ["$user", 0] }

            },
        },
        { $sort: { addedAt: -1 } },
        { $skip: SKIP },
        { $limit: 20 },
    ]).toArray();


    // const data = await posts.find().sort({ addedAt: -1 }).skip(SKIP).limit(20).toArray();

    return json(data);
}