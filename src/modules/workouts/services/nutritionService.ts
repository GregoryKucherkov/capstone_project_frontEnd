import { baseFetch } from "@/shared/api/baseApi";

export interface DailyNutrition {
    id: number;
    meal_type: string;
    calories: number | null;
    description: string;
    log_date: string; // "2026-01-15"
    user_id: number;
    created_at: string;
}


export const nutritionService = {
    listNutrition: (skip: number = 0, limit: number = 10): Promise<DailyNutrition[]> => {
        return baseFetch(`/nutrition?skip=${skip}&limit=${limit}`, {
            method: "GET"
        });
    },

    listDailyNutrition: (date: string, skip: number = 0, limit: number = 15): Promise<DailyNutrition[]> => {
        return baseFetch(`/nutrition/date?date=${date}&skip=${skip}&limit=${limit}`, {
            method: "GET"
        });
    },
    
    create: (data: { meal_type: string, calories: number, description: string }) => {
        return baseFetch("/nutrition", {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    getRange: (startDate: string, endDate: string) => {
        return baseFetch(`/nutrition/range?start_date=${startDate}&end_date=${endDate}`, {
            method: "GET"
        });
    },

    delete: (nutrId: number) => {
        return baseFetch(`/nutrition/${nutrId}`, {
            method: "DELETE"
        });
    }
};