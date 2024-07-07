export type UserType = {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[];
    $tenant: string;
    $updatedAt: string;
    accountId: string;
    avatar: string;
    email: string;
    name: string;
    username: string;
};

export type VideoType = {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[];
    $tenant: string;
    $updatedAt: string;
    prompt: string;
    thumbnail: string;
    title: string;
    creator: UserType;
    video: string;
};