
export type Account = {
    _id: string;
    email: string;
    displayName: string;
    photoURL: string;
    uid: string;
    userName: string;
}

export type DetailedAccount = Account & {
    followers: number;
    following: number;
}