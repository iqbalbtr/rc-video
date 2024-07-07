import client from "@libs/appwriter"
import { Databases, Storage, ID, Query } from "react-native-appwrite"
import { config } from "@libs/appwriter";
import { DocumentPickerAsset } from "expo-document-picker";
import { removeFile, uploadFile } from "./storage";
import { VideoType } from "@models/db-schema";
import { getIdurl } from "@utils/url";

const database = new Databases(client);
const storage = new Storage(client);

export type CreateVideoForm = {
    title: string,
    thumbnail: DocumentPickerAsset | null | string,
    video: DocumentPickerAsset | null | string,
    prompt: string,
    creator: string,
}

export const getAllPost = async () => {
    const get = await database.listDocuments(
        config.databaseId!,
        config.videosCollectionId!
    )

    if (!get) {
        throw new Error();
    }

    return get.documents as any
}

export const getLatestPost = async () => {
    const get = await database.listDocuments(
        config.databaseId!,
        config.videosCollectionId!,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
    )

    if (!get)
        throw new Error("Something wnt wrong");

    return get.documents as any;
}

export const searchVideo = async (query: string) => {
    const get = await database.listDocuments(
        config.databaseId!,
        config.videosCollectionId!,
        [
            Query.search("title", query)
        ]
    )

    if (!get)
        throw new Error("Something went wrong");

    return get.documents as any
}

export const getUserPost = async (accountId: string) => {
    const get = await database.listDocuments(
        config.databaseId!,
        config.videosCollectionId!,
        [
            Query.equal("creator", accountId)
        ]
    )

    if (!get)
        throw new Error("Something went wrong")


    return get.documents as any
}

export const createNewPost = async (data: CreateVideoForm) => {

    if(
        !data.creator ||
        !data.prompt ||
        !data.thumbnail ||
        !data.title ||
        !data.video
    ){
        throw new Error("Please fill all field!");
    }
    
    const [thumbnail, video] = await Promise.all([
        uploadFile(data.thumbnail, "image"),
        uploadFile(data.video, "video")
    ]);

    const upload = await database.createDocument(
        config.databaseId!,
        config.videosCollectionId!,
        ID.unique(),
        {
            title: data.title,
            prompt: data.prompt,
            thumbnail: thumbnail,
            video: video,
            creator: data.creator,
        }
    )

    if(!upload)
        throw new Error("Something went wrong")

    return upload;
}

export const newLikes = async(videoId: string, userId: string) => {

    const get = await database.getDocument(
        config.databaseId!,
        config.videosCollectionId!,
        videoId
    )

    const likes: string[] = get.likes || [];

    likes.push(userId);

    return await database.updateDocument(
        config.databaseId!,
        config.videosCollectionId!,
        videoId,
        {
            likes
        }
    )
}

export const getPostById = async(postId: string) => {
    const get = await database.getDocument(
        config.databaseId!,
        config.videosCollectionId!,
        postId
    )

    return get as VideoType
}

export const removePost = async(postId: string, thumbUrl: string, videoUrl: string) => {

    await storage.deleteFile(
        config.storageId!,
        getIdurl(thumbUrl)
    )

    await storage.deleteFile(
        config.storageId!,
        getIdurl(videoUrl)
    )

    const remove = await database.deleteDocument(
        config.databaseId!,
        config.videosCollectionId!,
        postId
    )

    if(!remove) 
        throw new Error("Something wnt wrong");

    return
}

export const updatePost = async (data: CreateVideoForm, postId: string, currentFile: {thumbnail: string, video: string}) => {

    if (typeof data.thumbnail !== "string") {
        await removeFile(currentFile.thumbnail);
    }
    if (typeof data.video !== "string") {
        await removeFile(currentFile.video);
    }

    const [thumbnail, video] = await Promise.all([
        typeof data.thumbnail !== "string" ? uploadFile(data.thumbnail, "image") : currentFile.thumbnail,
        typeof data.video !== "string" ? uploadFile(data.video, "video") : currentFile.video
    ]);

    const upload = await database.updateDocument(
        config.databaseId!,
        config.videosCollectionId!,
        postId,
        {
            title: data.title,
            prompt: data.prompt,
            thumbnail: thumbnail || currentFile.thumbnail,
            video: video || currentFile.video,
            creator: data.creator,
        }
    );

    if (!upload) {
        throw new Error("Something went wrong");
    }

    return upload;
}
