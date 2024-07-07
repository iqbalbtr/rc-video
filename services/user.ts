import client from "@libs/appwriter"
import { Account, Avatars, Databases, ID, Query } from "react-native-appwrite"
import { config } from "@libs/appwriter";
import { UserType } from "../context/SessionContext";
import { getUserPost } from "./videos";

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export const register = async (
    name: string,
    username: string,
    email: string,
    password: string
) => {
    const user = await account.create(
        ID.unique(),
        email,
        password,
        username
    )

    if (!user)
        throw new Error();

    const profile = avatar.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
        config.databaseId!,
        config.usersCollectionId!,
        ID.unique(),
        {
            username: username,
            email,
            avatar: profile,
            name,
            accountId: user.$id
        }
    )

    await database.createDocument(
        config.databaseId!,
        config.bookmarkCollectionId!,
        ID.unique(),
        {
            user: newUser.$id
        }
    )

    await database.createDocument(
        config.databaseId!,
        config.subscribeCollectionId!,
        ID.unique(),
        {
            user: newUser.$id
        }
    )

    return newUser;
}

export const signIn = async (
    email: string,
    password: string
) => {
    const sign = await account.createEmailPasswordSession(email, password);
    if (!sign)
        throw new Error();
    return sign as any;
}

export const getCurrentUser = async (): Promise<UserType> => {
    const user = await account.get();

    if (!user)
        throw new Error("Something wnt wrong");

    const userInfo = await database.listDocuments(
        config.databaseId!,
        config.usersCollectionId!,
        [
            Query.equal("accountId", user.$id)
        ]
    )


    if (!userInfo)
        throw new Error("Something wnt wrong");

    const result = userInfo.documents[0];

    return {
        username: result.username,
        accountId: result.accountId,
        email: result.email,
        avatar: result.avatar,
        name: result.name,
        id: result.$id
    }
}

export const logout = async () => {
    const out = await account.deleteSession("current");

    return out;
}

export const getUserById = async (userId: string) => {
    const user = await database.listDocuments(
        config.databaseId!,
        config.usersCollectionId!,
        [
            Query.equal("$id", userId)
        ]
    )

    if (!user)
        throw new Error("Something wnt wrong");
    
    return user.documents[0] as any
}

export const getDetailInfoUser = async (userId: string) => {
    const followers = await database.listDocuments(
        config.databaseId!,
        config.subscribeCollectionId!,
        [
            Query.equal("user", userId)
        ]
    )
    const post = await getUserPost(userId);

    const sumPost = post.length as number
    const sumFollowers = followers.documents[0].subscribers.length as number
    
    return {
        post: sumPost,
        followers: sumFollowers
    }
}

export type DetailUserType = typeof getDetailInfoUser