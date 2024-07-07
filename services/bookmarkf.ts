import client from "@libs/appwriter"
import { Databases, Query } from "react-native-appwrite"
import { config } from "@libs/appwriter";
import { VideoType } from "@models/db-schema";
const database = new Databases(client);


export const existFromBookmark = async (userId: string, postId: string) => {

    const get = await database.listDocuments(
        config.databaseId!,
        config.bookmarkCollectionId!,
        [
            Query.equal("user", userId)
        ]
    )
    

    const result = get.documents.filter(foo => foo.videos.find((fii: VideoType) => fii.$id === postId))

    if (!result.length) {
        return false
    }

    return result[0];
}

export const savedToBookmark = async (postId: string, userId: string) => {
    const query = await database.listDocuments(
        config.databaseId!,
        config.bookmarkCollectionId!,
        [
            Query.equal("user", userId)
        ]
    )

    if (!query || !query.documents.length)
        throw new Error("User is not found");

    const videos: string[] = query.documents[0].videos || [];

    videos.push(postId);

    return await database.updateDocument(
        config.databaseId!,
        config.bookmarkCollectionId!,
        query.documents[0].$id,
        {
            videos
        }
    )
}

export const removeFromBookmark = async (userId: string, postId: string) => {
    const query = await database.listDocuments(
        config.databaseId!,
        config.bookmarkCollectionId!,
        [
            Query.equal("user", userId)
        ]
    )

    if (!query || !query.documents.length)
        throw new Error("User is not found");

    const videos: string[] = query.documents[0].videos || [];
    const update = videos.filter((fo: any) => fo.$id !== postId);

    return await database.updateDocument(
        config.databaseId!,
        config.bookmarkCollectionId!,
        query.documents[0].$id,
        {
            videos: update
        }
    )
}

export const getUserBookmark = async (userId: string) => {
    const query = await database.listDocuments(
        config.databaseId!,
        config.bookmarkCollectionId!,
        [
            Query.equal("user", userId)
        ]
    )

    return query.documents[0].videos as any
}