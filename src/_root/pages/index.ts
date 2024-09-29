/*
Make importing each page in src/_root/pages cleaner

For example:
    import { Home, page2, ... } from './_root/pages';
rather than
    import Home from './_root/pages/Home';
    import page2 from './_root/pages/page2';
*/

export { default as Home } from './Home';