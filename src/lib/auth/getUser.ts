import { auth } from "$lib/admin";

export const getUser = async (req: Request) => {
    try {
        const { headers } = req;
        const Bearer = headers.get("Authorization");
        if (!Bearer) {
            return null;
        }
        const token = Bearer.split(" ")[1];
        const user = await auth.verifyIdToken(token);
        return user;
    } catch (e) {
        return null;
    }

}