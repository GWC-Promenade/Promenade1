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
import { createPost, createUserAccount, signInAccount, signOutAccount } from '../appwrite/api'
import { INewPost, INewUser } from '@/types'
import { QUERY_KEYS } from './queryKeys'

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

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        /* 
        - Invalidating queries marks them as stale, meaning they should be refetched even if they're in cache
        - We use a constant QUERY_KEYS instead of a string literal in order to reduce the chance of bugs due to misspellings
        */
      },
    });
  };