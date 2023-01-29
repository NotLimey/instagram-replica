
import { ObjectId, type Document } from 'mongodb'

export const get = (id: string): Document[] => [
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

]