import { useUserContext } from '@/context/AuthContext';
import { formatDateString } from '@/lib/utils';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import PostMap from './PostMap';
import TransportationIcon from './TransportationIcon';

type PostCardProps = {
  post: Models.Document;
}
const PostCard = ( {post}: PostCardProps ) => {
  const { user } = useUserContext();

  if (!post.creator) return; // something wrong

  const location: google.maps.LatLngLiteral = {
    lat: post.latitude,
    lng: post.longitude,
  }

  console.log("in PostCard: from post: caption=", post.caption);
  console.log("in PostCard: from post: latitude=", post.latitude, "longitude=", post.longitude);
  console.log("in PostCard: from post: tags=", post.tags);

  return (
    <>
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img 
              src={post?.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="creator profile"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDateString(post.$createdAt)}
              </p>
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

          <Link to={`/update-post/${post.$id}`}
            className={`${user.id !== post.creator.$id && "hidden"}`}>
            <img 
              src={"/assets/icons/edit.svg"}
              alt="edit post"
              width={20}
              height={20}
            />
          </Link>
      </div>

        <Link to={`/posts/${post.$id}`}>
          <div className="small-medium lg:base-medium py-5">
            <p>{post.caption}</p>
            {post.tags[0] != '' && (
              <ul className="flex gap-1 mt-2">
              {post.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
            )}
            
          </div>

          <img 
            src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
            className="post-card_img"
            alt="post image"
          />
        </Link>
        <PostMap location={location}/>

        <div className="flex gap-2 flex-row justify-start py-3  ">
          {post.transportation.map((transport: string) => (
            <li key={transport} className="bg-primary-500 flex justify-center items-center rounded">
                <TransportationIcon transportation={transport}></TransportationIcon>
            </li>
          ))}
        </div>
          
        
        <PostStats post={post} userId={user.id} /> 
    </div>
    
    </>
  )
}

export default PostCard