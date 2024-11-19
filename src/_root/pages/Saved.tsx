import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useUserContext } from '@/context/AuthContext';
import { useGetCurrentUser, useGetRecentPosts, useGetSavedPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const Saved = () => {
  const{ user } = useUserContext();
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetSavedPosts();

  // @ts-expect-error unused
  return (
      <div className="flex flex-1">
        <div className="saved-container">
          <div className="saved-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full mt-8">Saved posts</h2>
            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {/* {posts?.documents.map((post: Models.Document) => ( */}
                {posts?.post.map((post: Models.Document) => (
                  <PostCard post={post} key={post.caption}/>
                 ))} 
              </ul>
            )}
          </div>
        </div>
      </div>
    )
}

export default Saved