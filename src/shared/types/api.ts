export interface AppError extends Error {
  status?: number;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  is_verified: boolean;
  avatar: string | null;
  created_at: string;
  // ... any other fields 
}


// /users/me response
export interface User {
  name: string,
  description: string,
  email: string,
  is_private: boolean,
  is_active: boolean,
  is_verified: boolean,
  id: number,
  avatar: string,
  created_at: string,
  updated_at: string
}

export interface UserGuest {
  id: number;
  name: string;
  avatar?: string;
  description?: string;
  isFollowed?: boolean;
}

export interface UserListResponse {
  items: UserGuest[];
  total: number;
  page: number;
  size: number;
}

export interface SignInValues {
  email: string;
  password: string;
}


export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface Post {
  id: number,
  body: string,
  user_id: number,
  likes_count: number,
  is_liked_by_me: boolean,
  media: string[]
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  size: number;
}

export interface FavoriteResponse {
  exercise_id: number,
  user_id: number
}