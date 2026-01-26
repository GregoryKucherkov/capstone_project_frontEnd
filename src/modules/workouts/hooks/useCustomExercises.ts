import { exercisesService } from "@/modules/workouts/services/exercisesServise";
import { useQuery } from "@tanstack/react-query";


export const useCustomExercises = (skip: number = 0, limit: number = 10) => {
    return useQuery({
        queryKey: ["customExercises", skip, limit],
        queryFn: () => exercisesService.getListCustomExercises(skip, limit),

        placeholderData: (previousData) => previousData,
  });

}