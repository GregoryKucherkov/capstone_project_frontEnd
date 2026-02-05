import { exerciseService } from "@/modules/exercises/services/exercise-api";
import { useQuery } from "@tanstack/react-query";

export const useExercises = (
  query: string,
  page: number,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["exercises", query, page, limit],
    queryFn: () => exerciseService.getCoreExercises(query, page, limit),
    enabled: query.length === 0 || query.length >= 2,

    // staleTime: Infinity, // Data stays "fresh" as long as the app is open
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false, // Don't fetch again if user navigates back to the page
    refetchOnWindowFocus: false,

    placeholderData: (previousData) => previousData,

    select: (data) => {
      return {
        exercises: data.exercises || [],
        total: data.total || 0,
        // We calculate totalPages here so the component doesn't have to
        totalPages: Math.ceil((data.total || 0) / limit),
        currentPage: data.page || page, // Using what the server returns
      };
    },
  });
};

// for multi fields search
// export const useExercises = (filterKey: string, filterValue: string, keyword: string) => {
//   return useQuery({
//     // React Query caches based on these three values
//     queryKey: ["exercises", filterKey, filterValue, keyword],
//     queryFn: () => getExercises(filterKey, filterValue, keyword),
//   });
// };

export const useExerciseId = (exerciseId: number) => {
  return useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: () => exerciseService.getCoreExerciseId(exerciseId),
    enabled: !!exerciseId,
    staleTime: Infinity,
  });
};
