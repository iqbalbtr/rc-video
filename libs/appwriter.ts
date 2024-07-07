import { Client } from "react-native-appwrite"
  
  export const config = {
    endpoint: process.env.EXPO_PUBLIC_ENDPOINT,
    Platform: process.env.EXPO_PUBLIC_PLATFORM,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
    usersCollectionId: process.env.EXPO_PUBLIC_USERS_COLLECTION_ID,
    videosCollectionId: process.env.EXPO_PUBLIC_VIDEOS_COLLECTION_ID,
    bookmarkCollectionId: process.env.EXPO_PUBLIC_BOOKMARK_COLLECTION_ID,
    subscribeCollectionId: process.env.EXPO_PUBLIC_SUBSCRIBE_COLLECTION_ID,
    storageId: process.env.EXPO_PUBLIC_STORAGE_ID,
  };

const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.Platform!)

export default client;