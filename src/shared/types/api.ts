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