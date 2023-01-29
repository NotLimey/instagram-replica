import type { Account } from "./auth.types";


export type Post = {
    _id: string;
    url: string;
    description: string;
    uid: string;
    addedAt: Date;
    likes: number;
    liked: boolean;
    comments: Comment[];
    user: Account;
}

export type Comment = {
    message: string;
    uid: string;
}