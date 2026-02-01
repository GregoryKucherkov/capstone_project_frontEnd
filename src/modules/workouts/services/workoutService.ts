import { baseFetch } from "@/shared/api/baseApi";
import type {
  ProgramDayOutSlim,
  ProgramExerciseCreatePayload,
  ProgramExerciseOut,
} from "@/shared/types/api";

export const workoutService = {
  // Retrieves scheduled workouts for a date range
  getSchedule: async (startDate: string, endDate: string) => {
    return await baseFetch(
      `/programs/schedule?start_date=${startDate}&end_date=${endDate}`,
      {
        method: "GET",
      },
    );
  },

  // Gets the full details of a specific day (including exercises)
  getDayById: async (dayId: number) => {
    return await baseFetch(`/programs/days/${dayId}`, {
      method: "GET",
    });
  },

  // Lists completed sessions to calculate "3rd this week"
  listSessions: async () => {
    return await baseFetch("/workouts/", {
      method: "GET",
    });
  },

  deleteExercise: async (dayId: number, exerciseId: number) => {
    return await baseFetch(`/programs/days/${dayId}/exercises/${exerciseId}`, {
      method: "DELETE",
    });
  },

  createProgramDay: (data: {
    scheduled_for: string;
    title?: string | null;
    program_id?: number | null;
  }): Promise<ProgramDayOutSlim> => {
    return baseFetch("/programs/days", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  addExerciseToDay: (dayId: number, exercise: ProgramExerciseCreatePayload) => {
    return baseFetch(`/programs/days/${dayId}/exercises`, {
      method: "POST",
      body: JSON.stringify(exercise),
    });
  },

  addExerciseToDayBulk: (
    dayId: number,
    exercise: ProgramExerciseCreatePayload[],
  ) => {
    return baseFetch(`/programs/days/${dayId}/exercises/bulk`, {
      method: "POST",
      body: JSON.stringify(exercise),
    });
  },

  scheduleWorkout: (data: { dayId: number; scheduled_for: string }) => {
    return baseFetch("/programs/schedule", {
      method: "POST",
      body: JSON.stringify({
        program_day_id: data.dayId,
        scheduled_for: data.scheduled_for,
      }),
    });
  },

  getProgramDayExercises: async (
    dayId: number,
  ): Promise<ProgramExerciseOut[]> => {
    return await baseFetch(`/programs/days/${dayId}/exercises`, {
      method: "GET",
    });
  },
};
