/* 
Functions we'll call to connect to Appwrite
*/
import { ID } from 'appwrite';
import { INewUser } from "@/types";
import { account } from './config';

/*
Create a new account in Appwrite->Auth upon sign up
*/
export async function createUserAccount(user:INewUser) { 
    try {
        const newAccount = await account.create(
            ID.unique(), // autogenerate a unique id for every user
            user.email,
            user.password,
            user.name
        );
        return newAccount;
    } catch (error) {
        console.log("Error creating user account", error);
        return error;
    }
}