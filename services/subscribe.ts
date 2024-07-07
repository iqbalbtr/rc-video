import client from "@libs/appwriter"
import { Databases, Query } from "react-native-appwrite"
import { config } from "@libs/appwriter";
import { UserType } from "@models/db-schema";
const database = new Databases(client);

export const existFromSubscribe = async (userId: string, subsId: string) => {
    
    const get = await database.listDocuments(
        config.databaseId!,
        config.subscribeCollectionId!,
        [
            Query.equal("user", userId)
        ]
    )
        
    const result = get.documents.filter(foo => foo.subscribers.find((fii: UserType) => fii.$id === subsId))

    if (!result.length) {
        return false
    }

    return result[0];
}

export const subscribeUser = async (userId: string, creatorId: string) => {

    
    const query = await database.listDocuments(
        config.databaseId!,
        config.subscribeCollectionId!,
        [
            Query.equal("user", creatorId)
        ]
    );

    if (!query || !query.documents.length) {
        throw new Error("User is not found");
    }

    const subscribers: string[] = query.documents[0].subscribers || [];

    if(userId === creatorId){

        throw new Error("User unable subscribe")
    }
    
    subscribers.push(userId);

    return await database.updateDocument(
        config.databaseId!,
        config.subscribeCollectionId!,
        query.documents[0].$id,
        {
            subscribers: subscribers
        }
    );
};

export const removeFromSubscribe = async(userId: string, subsId: string) => {
    const query = await database.listDocuments(
        config.databaseId!,
        config.subscribeCollectionId!,
        [
            Query.equal("user", subsId)
        ]
    )

    if(!query || !query.documents.length)
        throw new Error("User is not found");

    const subscribers: string[] = query.documents[0].subscribers || [];

    const update = subscribers.filter((fo: any) => fo.$id !== userId);

    return await database.updateDocument(
        config.databaseId!,
        config.subscribeCollectionId!,
        query.documents[0].$id,
        {
            subscribers: update
        }
    )
}