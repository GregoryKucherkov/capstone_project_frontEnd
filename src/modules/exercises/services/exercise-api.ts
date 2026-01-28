import { baseFetch } from "@/shared/api/baseApi";
import type {
  CoreExercisesData,
  PaginatedCoreExercises,
} from "@/shared/types/api";

export const exerciseService = {
  getCoreExercises: (
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedCoreExercises> => {
    const skip = (page - 1) * limit;
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    params.append("skip", skip.toString());
    params.append("limit", limit.toString());

    return baseFetch(`/exercises?${params.toString()}`, {
      method: "GET",
    });
  },

  getCoreExerciseId: (exercise_id: number): Promise<CoreExercisesData> => {
    return baseFetch(`/exercises/${exercise_id}`, {
      method: "GET",
    });
  },
};

// export const getExercises = async (filterKey: string, filterValue: string, keyword?: string) => {
//   const params = new URLSearchParams();

//   // 1. Add the required filter (e.g., muscles=abs)
//   params.append(filterKey, filterValue);

//   // 2. Add the search keyword if it exists
//   if (keyword) {
//     params.append("keyword", keyword);
//   }

//   // Use your baseFetch exactly as you wrote it
//   return baseFetch(`/exercises?${params.toString()}`);
// };
