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

export interface FavoriteResponse extends CoreExercisesData {
  user_id: number;
}

export interface PaginatedFavoriteResponse {
  exercises: FavoriteResponse[];
  total_count: number;
  page: number;
  size: number;
}

export type ListItem = Post | UserGuest | FavoriteResponse;

export interface PaginatedListItem {
  items: ListItem[];
  total: number;
  page: number;
  size: number;
}

export interface ProgramDayOutSlim {
  id: number;
  scheduled_for: string;
  title: string | null;
  user_id: number | null;
  program_id: number | null;
}

export interface ProgramDayOut {
  scheduled_for: string; // when the day is scheduled
  title: string; // program day title
  id: number; // day id
  user_id: number;
  program_id: number;
  planned_workout: {
    scheduled_for: string;
    id: number;
    program_day_id: number;
  };
  exercises: ProgramDayExercise[]; // the actual exercises for the day
}

export interface ProgramDayExercise {
  id: number; // exercise id
  name: string; // exercise name
  notes?: string; // optional notes
  sets?: number;
  reps: string;
  weight?: number;
  rest_seconds?: number;
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
  weight?: number | "";
};

export interface CustomExercisesCreate {
  title: string;
  muscle_group?: string | null;
  difficulty?: string | null;
  description?: string | null;
  media_url?: string | null;
  calories_burn?: number | null;
}

export type ProgramExerciseCreatePayload = {
  exercise_name?: string;

  sets: number;
  reps: string;
  weight?: number;
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

export interface PaginatedCoreExercises {
  exercises: CoreExercisesData[];
  total: number;
  page: number;
  size: number;
}

export interface QuickWorkoutExercise {
  title: string;
  sets: number | "";
  reps: number | "";
  weight?: number | "";
  rest: number | "";
}

export type PlannedWorkoutProps = {
  id: number;
  scheduled_for: string;
  program_day_id: number;
};

export interface WorkoutSessionOut {
  id: number;
  user_id: number;
  notes: string;
  date: string; // "2026-02-01T10:54:07.601Z"
  duration: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedWorkouts {
  workouts: WorkoutSessionOut[];
  total_count: number;
  page: number;
  size: number;
}

export interface ProgramExerciseOut {
  exercise_name?: string | null;
  sets: number;
  reps: string;
  weight?: number | null;
  rest_seconds?: number | null;
  id: number;
  day_id: number;
  core_exercise_id?: number | null;
  custom_exercise_id?: number | null;
  core_exercise?: CoreExercisesData | null;
  custom_exercise?: OwnExercise | null;
}
