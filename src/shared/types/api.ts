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
  name: string;
  description: string;
  email: string;
  is_private: boolean;
  is_active: boolean;
  is_verified: boolean;
  id: number;
  avatar: string;
  created_at: string;
  updated_at: string;
  isFollowed?: boolean;
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
  id: number;
  body: string;
  user_id: number;
  likes_count: number;
  is_liked_by_me: boolean;
  media: string[];
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  size: number;
}

export interface FavoriteResponse {
  exercise_id: number;
  user_id: number;
}

export type ListItem = Post | UserGuest | FavoriteResponse;

export interface ProgramDayOutSlim {
  id: number;
  scheduled_for: string;
  title: string | null;
  user_id: number | null;
  program_id: number | null;
}

export interface CustomExercisesCreate {
  title: string;
  muscle_group?: string | null;
  difficulty?: string | null;
  description?: string | null;
  media_url?: string | null;
  calories_burn?: number | null;
}

export interface ExerciseCommon {
  id: number;
  title: string;
  muscle_group?: string | null;
  difficulty?: string | null;
  description?: string | null;
  media_url?: string | null;
  calories_burn?: number | null;
}

export interface CoreExercisesData extends ExerciseCommon {
  created_at: string;
}

export interface OwnExercise extends ExerciseCommon {
  user_id: number;
  created_at: string;
}

export type PlannedExerciseDraft = {
  tempId: string; // frontend identity
  exerciseId: number; // backend exercise id
  source: "library" | "user";

  title: string;
  muscle_group?: string | null;
  difficulty?: string | null;
  description?: string | null;
  media_url?: string | null;
  calories_burn?: number | null;

  sets: number | "";
  reps: number | "";
  rest: number | "";
};

export interface CustomExercisesCreate {
  title: string;
  muscle_group?: string | null;
  difficulty?: string | null;
  description?: string | null;
  media_url?: string | null;
  calories_burn?: number | null;
}

export interface ExerciseCommon {
  id: number;
  title: string;
  muscle_group?: string | null;
  difficulty?: string | null;
  description?: string | null;
  media_url?: string | null;
  calories_burn?: number | null;
}

export interface CoreExercisesData extends ExerciseCommon {
  created_at: string;
}

export interface OwnExercise extends ExerciseCommon {
  user_id: number;
  created_at: string;
}

export type ProgramExerciseCreatePayload = {
  exercise_name?: string;

  sets: number;
  reps: string;
  rest_seconds: number;

  core_exercise_id?: number;
  custom_exercise_id?: number;
};

export interface PaginatedExercises {
  exercises: OwnExercise[];
  total: number;
  page: number;
  size: number;
}
