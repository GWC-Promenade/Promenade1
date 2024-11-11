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

import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getPostById, getRecentPosts, likePost, savePost, signInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { INewPost, INewUser, IUpdatePost } from '@/types'
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

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: () => getRecentPosts()
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, likesArray}: { postId:string; likesArray: string[]}) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}


export const useSavePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, userId}: { postId: string; userId: string }) => savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS. GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, imageId} : {postId: string, imageId: string}) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}