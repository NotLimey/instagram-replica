import type { Post } from "../types/post.types";


const getTimeSincePost = (post: Post) => {
    const now = new Date();
    const seconds = (now.getTime() - new Date(post.addedAt).getTime()) / 1000;
    if (seconds < 60) {
        return "right now";
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour ago`;
    } else {
        const days = Math.floor(seconds / 86400);
        return `${days} days ago`;
    }
};

export default getTimeSincePost;