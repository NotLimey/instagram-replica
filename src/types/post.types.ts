

export type Post = {
    _id: string;
    url: string;
    description: string;
    uid: string;
    addedAt: Date;
    likes: number;
    liked: boolean;
}