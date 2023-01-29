import { auth } from "$lib/admin";

export const getUser = async (req: Request) => {
    try {
        const { headers } = req;
        const bearer = headers.get("Authorization");
        if (!bearer) {
            return null;
        }
        const token = bearer.split(" ")[1];
        const user = await auth.verifyIdToken(token);
        return user;
    } catch (e) {
        return null;
    }

}