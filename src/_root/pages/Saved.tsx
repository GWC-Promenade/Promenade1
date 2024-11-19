import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useUserContext } from '@/context/AuthContext';
import { useGetCurrentUser, useGetRecentPosts, useGetSavedPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';

const Saved = () => {
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full mt-8">Saved posts</h2>
          <p className="text-light-4 ">No available posts</p>
        </div>
      </div>
    </div>
  )
}

export default Saved

