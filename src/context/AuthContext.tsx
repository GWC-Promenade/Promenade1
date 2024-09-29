/* 
Purpose is to know at all times whether or not we have a logged in user.
*/

import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

const INITIAL_STATE: IContextType = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async() => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  /*
  - "children" is what is between the opening and closing tags of <AuthProvider></AuthProvider>
  - We'll be wrapping our entire application with AuthProvider
  - All children can call "useContext(AuthContext)" (or equivalently, "useUserContext") in order to know who is logged in right now
  */

  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  /* 
  Get the current user and make sure it's successfully logged in right now
  */
  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log("error in AuthProvider, user is not authenticated:", error);
      return false;
    } finally { // whether the promise is fulfilled or not, do this afterwards
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]'
      // localStorage.getItem('cookieFallback') === null
    ) navigate('/sign-in')

    checkAuthUser();
  }, []);

  const value: IContextType = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);