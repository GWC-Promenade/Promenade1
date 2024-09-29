/*
Make importing each page in src/_root/pages cleaner

For example:
    import { Home, page2, ... } from './_root/pages';
rather than
    import Home from './_root/pages/Home';
    import page2 from './_root/pages/page2';
*/

export { default as Home } from './Home';
export { default as Explore } from './Explore';
export { default as Saved } from './Saved';
export { default as CreatePost } from './CreatePost';
export { default as Profile } from './Profile';
export { default as UpdateProfile } from './UpdateProfile';
export { default as EditPost } from './EditPost';
export { default as PostDetails } from './PostDetails';
export { default as AllUsers } from './AllUsers';
export { default as LikedPosts } from './LikedPosts';

