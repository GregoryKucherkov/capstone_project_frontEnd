import { workoutService } from "@/modules/workouts/services/workoutService";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useDeleteExercise = (dayId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (exerciseId: number) => 
            workoutService.deleteExercise(dayId, exerciseId),
        onSuccess: () => {
            // This forces the UI to update by refreshing the data
            queryClient.invalidateQueries({ queryKey: ["workoutDay", dayId] });
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
        }
    });
}