import { workoutService } from "@/modules/workouts/services/workoutService"
import { useMutation, useQueryClient } from "@tanstack/react-query";




export const useCreateProgramDay = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { scheduled_for: string; title?: string | null; program_id?: number | null }) => 
            workoutService.createProgramDay(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workout-schedule"] });
        }
    })
}