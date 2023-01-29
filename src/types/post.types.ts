

export type Post = {
    _id: string;
    url: string;
    description: string;
    uid: string;
    addedAt: Date;
    likes: number;
    liked: boolean;
    comments: Comment[];
}

export type Comment = {
    message: string;
    uid: string;
}