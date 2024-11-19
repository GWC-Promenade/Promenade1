import Loader from '@/components/shared/Loader';
import PostCard from '@/components/shared/PostCard';
import { useUserContext } from '@/context/AuthContext';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUserContext(); // Assuming you have a user context to get the current user

  // @ts-expect-error unused
  const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();

  useEffect(() => {
    if (user.id == '') {
      navigate('/sign-up'); // Redirect to login page if user is not logged in
    }
  }, [user, navigate]);

  // const isPostLoading = true;
  // const posts = null;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full mt-8">Home feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption}/>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home