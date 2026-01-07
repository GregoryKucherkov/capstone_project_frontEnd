import { getExercises } from "@/modules/exercises/services/exercise-api";
import { useQuery } from "@tanstack/react-query";



export const useExercises = (query: string) => {
  return useQuery({
    queryKey: ["exercises", query],
    queryFn: () => getExercises(query),
    enabled: query.length === 0 || query.length >= 2,

    staleTime: Infinity,          // Data stays "fresh" as long as the app is open
    refetchOnMount: false,        // Don't fetch again if user navigates back to the page
    refetchOnWindowFocus: false,
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


