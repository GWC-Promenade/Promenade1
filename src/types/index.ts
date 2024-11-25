/* 
source: https://github.com/adrianhajdin/social_media_app/tree/main
I stands for interface
*/
export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
  latitude: number; 
  longitude: number;
  transportation: Transportation[];
}; 

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
  latitude: number; 
  longitude: number;
  transportation: Transportation[];
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

// input fields for signing up
export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export enum Transportation {
  Bike = "bike",
  Walk = "walk",
  Bus = "bus"
}