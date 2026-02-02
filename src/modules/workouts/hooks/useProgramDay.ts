import { workoutService } from "@/modules/workouts/services/workoutService";
import type { ProgramDayOut, ProgramExerciseOut } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";

export type UseProgramDayArgs = {
  dayId: number;
  enabled?: boolean; // optional: only fetch when true
};

interface UseProgramDayExercisesArgs {
  dayId: number | null; // null if no selection yet
  enabled?: boolean;
}

export const useProgramDay = ({ dayId, enabled = true }: UseProgramDayArgs) => {
  return useQuery<ProgramDayOut>({
    queryKey: ["programDay", dayId],
    queryFn: () => workoutService.getDayById(dayId),
    enabled: enabled && Boolean(dayId),
  });
};

export const useProgramDayExercises = ({
  dayId,
  enabled = true,
}: UseProgramDayExercisesArgs) => {
  return useQuery<ProgramExerciseOut[]>({
    queryKey: ["programDayExercises", dayId],
    queryFn: () => {
      if (!dayId) return []; // Return empty array if no ID
      return workoutService.getProgramDayExercises(dayId);
    },
    enabled: enabled && Boolean(dayId),
  });
};
