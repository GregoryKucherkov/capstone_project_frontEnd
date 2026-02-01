import { mapDraftToProgramExercisePayload } from "@/modules/workouts/mappers/programExercise.mapper";
import { workoutService } from "@/modules/workouts/services/workoutService";
import type {
  PlannedExerciseDraft,
  ProgramExerciseCreatePayload,
} from "@/shared/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useScheduleWorkoutFlow = () => {
  const queryClient = useQueryClient();

  const addExercisesMutation = useMutation({
    mutationFn: ({
      dayId,
      payload,
    }: {
      dayId: number;
      payload: ProgramExerciseCreatePayload[];
    }) => workoutService.addExerciseToDayBulk(dayId, payload),
  });

  const scheduleDayMutation = useMutation({
    mutationFn: ({
      dayId,
      scheduledFor,
    }: {
      dayId: number;
      scheduledFor: string;
    }) =>
      workoutService.scheduleWorkout({
        dayId: dayId,
        scheduled_for: scheduledFor,
      }),
  });

  const scheduleWorkout = async ({
    dayId,
    exercises,
    scheduledFor,
  }: {
    dayId: number;
    exercises: PlannedExerciseDraft[];
    scheduledFor: Date;
  }) => {
    try {
      const payload = exercises.map(mapDraftToProgramExercisePayload);

      // Step 1 — add exercises
      await addExercisesMutation.mutateAsync({ dayId, payload });

      // Step 2 — schedule the day
      await scheduleDayMutation.mutateAsync({
        dayId,
        scheduledFor: scheduledFor.toISOString(),
      });

      // Step 3 — invalidate cash
      await queryClient.invalidateQueries({ queryKey: ["schedule"] });
      await queryClient.invalidateQueries({ queryKey: ["workoutDay"] });

      // Step 4 — toast success
      toast.success("Workout scheduled successfully!");
    } catch (err) {
      // Step 4 — toast error
      toast.error("Failed to schedule workout.");
      throw err; // rethrow if you want upstream handling
    }
  };

  return {
    scheduleWorkout,
    isPending: addExercisesMutation.isPending || scheduleDayMutation.isPending,
  };
};
