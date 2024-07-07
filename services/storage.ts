import client from "@libs/appwriter"
import { ID, ImageGravity, Storage } from "react-native-appwrite"
import { config } from "@libs/appwriter";
import { getIdurl } from "@utils/url";

const storage = new Storage(client)

export const getPriviewFile = async (fieldId: string, type: "image" | "video") => {

    let fileUrl;

    if (type === "image") {
        fileUrl = storage.getFilePreview(
            config.storageId!,
            fieldId
        )
    } else if (type === "video") {
        fileUrl = storage.getFilePreview(
            config.storageId!,
            fieldId,
            2000,
            2000,
            ImageGravity.Top,
            100
        )

    }

    if (!fileUrl) {
        throw Error;
    }

    return fileUrl;
}

export const uploadFile = async (file: any, type: "image" | "video") => {
    
    if(!file)
        throw Error;

    const {mimeType, ...rest} = file;

    const upload = await storage.createFile(
        config.storageId!,
        ID.unique(),
        {
            ...rest,
            type: mimeType,
        }
    )

    const url = await getPriviewFile(upload.$id, type);

    return url;
}

export const removeFile = async(file: string) => {
    await storage.deleteFile(
        config.storageId!,
        getIdurl(file)
    )

    return
}