import { baseFetch } from "@/shared/api/baseApi";



export const workoutService = {
    // Retrieves scheduled workouts for a date range
    getSchedule: (startDate: string, endDate: string) => {
        return baseFetch(`/programs/schedule?start_date=${startDate}&end_date=${endDate}`, {
            method: "GET"
        });
    },

    // Gets the full details of a specific day (including exercises)
    getDayById: (dayId: number) => {
        return baseFetch(`/programs/days/${dayId}`, {
            method: "GET"
        });
    },

    // Lists completed sessions to calculate "3rd this week"
    listSessions: () => {
        return baseFetch("/workouts/", {
            method: "GET"
        });
    },

    deleteExercise: (dayId: number, exerciseId: number) => {
    return baseFetch(`/programs/days/${dayId}/exercises/${exerciseId}`, {
        method: "DELETE"
    });
    },
};