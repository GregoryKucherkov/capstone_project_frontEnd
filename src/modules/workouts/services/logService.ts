import { baseFetch } from "@/shared/api/baseApi";
import type { PaginatedWorkouts } from "@/shared/types/api";

export const logService = {
  createSession: () => {
    console.log("Calling API /workouts/start");
    return baseFetch(`/workouts/start`, {
      method: "POST",
      body: JSON.stringify({ date: new Date().toISOString() }),
    });
  },

  cancelSession: (sessionId: number) => {
    return baseFetch(`/workouts/${sessionId}`, {
      method: "DELETE",
    });
  },

  finishSession: (
    sessionId: number,
    data: { duration: number; notes?: string },
  ) => {
    return baseFetch(`/workouts/${sessionId}/finish`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addExercise: (
    sessionId: number,
    data: { name: string; notes?: string; planned_exercise_id?: number },
  ) => {
    return baseFetch(`/workouts/${sessionId}/exercise`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addSet: (
    exerciseId: number,
    data: {
      reps: string;
      weight?: number;
      rest_seconds?: number;
      notes?: string;
      completed?: boolean;
    },
  ) => {
    return baseFetch(`/workouts/exercises/${exerciseId}/sets`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addSetBulk: (
    exerciseId: number,
    data: {
      reps: string;
      weight?: number;
      rest_seconds?: number;
      notes?: string;
      completed?: boolean;
    }[],
  ) => {
    return baseFetch(`/workouts/exercises/${exerciseId}/sets/bulk`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  listWorkouts: (skip: number, limit: number): Promise<PaginatedWorkouts> => {
    return baseFetch(`/workouts?skip=${skip}&limit=${limit}`, {
      method: "GET",
    });
  },
};
