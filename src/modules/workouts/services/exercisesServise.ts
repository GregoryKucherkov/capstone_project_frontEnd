import { baseFetch } from "@/shared/api/baseApi";
import type {
  CustomExercisesCreate,
  PaginatedExercises,
} from "@/shared/types/api";

export const exercisesService = {
  createCustomExercise: async (data: CustomExercisesCreate) => {
    const formData = new FormData();

    formData.append("title", data.title);

    if (data.muscle_group) formData.append("muscle_group", data.muscle_group);

    if (data.difficulty) formData.append("difficulty", data.difficulty);

    if (data.description) formData.append("description", data.description);

    if (data.calories_burn !== undefined && data.calories_burn !== null)
      formData.append("calories_burn", String(data.calories_burn));

    return await baseFetch("/exercises/custom", {
      method: "POST",
      body: formData,
    });
  },

  getListCustomExercises: async (
    skip: number,
    limit: number,
  ): Promise<PaginatedExercises> => {
    return await baseFetch(`/exercises/custom?skip=${skip}&limit=${limit}`, {
      method: "GET",
    });
  },
};
