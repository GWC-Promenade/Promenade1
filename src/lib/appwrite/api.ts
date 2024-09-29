/* 
Functions we'll call to connect to Appwrite
*/
import { ID } from 'appwrite';
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';

/*
- Create a new account in Appwrite->Auth upon sign up
- Save the new user to DB
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