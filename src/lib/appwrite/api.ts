/* 
Functions we'll call to connect to Appwrite
*/
import { ID, ImageGravity, Query } from 'appwrite';
import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';

/*
- Create a new account in Appwrite->Auth upon sign up
- Save the new user to DB
- Uses Appwrite functions to do so
*/
export async function createUserAccount(user:INewUser) { 
    try {
        const newAccount = await account.create( // add account to Appwrite->Auth
            ID.unique(), // autogenerate a unique id for every user
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error; 

        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({ // add user to Appwrite->Databases
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log("Error creating user account", error);
        return error;
    }
}

/*
Helper func to save new account to DB
*/
export async function saveUserToDB(user: { 
    // destructure parameter "user"
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId, // which database we're modifying
            appwriteConfig.userCollectionId, // which collection we're modifying: Users
            ID.unique(), // unique ID of this new addition ("document") to the collection
            user, // content of the "document" we're adding
        );
        return newUser;
    } catch (error) {
        console.log("error saving user to db:", error);
    }
}

/* 
Sign in a user and create a new session
*/
export async function signInAccount(user: {
    email: string;
    password: string
}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log("error signing in:", error);
    }
}

/*
After signing in, return the user that is currently in session
*/
export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)] // get an array of all documents whose id == currentAccount's id
        )
        
        if (!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log("error signing in: getting current user:", error);
    }
}

/*
Delete user session
*/
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log("error signing out:", error);
    }
}

/*
Upload new post to storage, and add post to database
*/
export async function createPost(post: INewPost) {
    try {
        console.log("createPost called. post=", post);
        // Upload image to Appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;

        // Get file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        console.log("fileUrl=", fileUrl);
        if (!fileUrl) { // If something was corrupted, delete the uploaded file
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        // Convert tags to an array
        const tags = post.tags?.replace(/ /g,'').split(',') || []; // replace all spaces with an empty string. Then split by commas

        // Save new post to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )
        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw new Error;
        }

        return newPost;

    } catch (error) {
        console.log("error creating post:", error)
    }
}

/*
Upload image to Appwrite storage bucket
*/
export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.log("error uploading file:", error)
    }
}

export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000, 
            2000, // width and height
            ImageGravity.Top, // where it's gonna show
            100 // quality
        );
        if (!fileUrl) throw Error
        
        return fileUrl;
    } catch (error) {
        console.log("error getting file preview:", error)
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);
        return { status: 'ok' }
    } catch (error) {
        console.log("error deleting file:", error)
    }
}