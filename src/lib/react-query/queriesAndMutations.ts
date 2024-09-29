/* 
- Sets up React Query mutations, which are basically wrappers around the Appwrite API functions we wrote
- React Query is an extra layer between our Appwrite API and our front end, in order to have smooth extra features like caching
*/

import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/api'
import { INewUser } from '@/types'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user) // wrapper around our API
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string; 
            password: string
        }) => signInAccount(user) // wrapper around our API
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount // wrapper around our API
    })
}