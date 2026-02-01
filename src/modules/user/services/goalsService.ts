import { baseFetch } from "@/shared/api/baseApi";

export const goalsService = {
  getGoals: (skip: number, limit: number) => {
    return baseFetch(`/users/me/goals?skip=${skip}&limit=${limit}`, {
      method: "GET",
    });
  },

  getGoalsById: (id: number) => {
    return baseFetch(`/users/me/goals/${id}`, {
      method: "GET",
    });
  },
};
