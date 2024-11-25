import { Routes, Route } from 'react-router-dom';

import './globals.css'
import SigninForm from './_auth/forms/SigninForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster";
import PostMap from './components/shared/PostMap';
import { Client } from 'appwrite';

const App = () => {
  const client = new Client();
  client.setProject('66f8b014001417eb8ea5');
  return (
    <main className="flex h-screen">
      <Routes>
          {/* public routes: routes everyone can see */}
          <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SigninForm/>}/>
              <Route path="/sign-up" element={<SignupForm/>}/>

              <Route path="/map-test" element={<PostMap location={{lat: 0, lng: 0}}/>}/>
          </Route>
          

          {/* 
          private routes: routes you can only see if you sign in 
          - RootLayout contains the left sidebar, which will be open no matter which of these pages we're on
          */}
          <Route element={<RootLayout/>}> 
              <Route index element={<Home/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/saved" element={<Saved/>}/>
              <Route path="/all-users" element={<AllUsers/>}/>
              <Route path="/create-post" element={<CreatePost/>}/>
              <Route path="/update-post/:id" element={<EditPost/>}/>
              <Route path="/posts/:id" element={<PostDetails/>}/>
              <Route path="/profile/:id/*" element={<Profile/>}/>
              <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
          </Route>
          
      </Routes>
      
      <Toaster /> {/* shadcn popups */}
    </main>
  )
}

export default App 