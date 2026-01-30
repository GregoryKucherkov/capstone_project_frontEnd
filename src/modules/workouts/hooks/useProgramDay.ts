import { workoutService } from "@/modules/workouts/services/workoutService";
import type { ProgramDayOut } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";

export type UseProgramDayArgs = {
  dayId: number;
  enabled?: boolean; // optional: only fetch when true
};

export const useProgramDay = ({ dayId, enabled = true }: UseProgramDayArgs) => {
  return useQuery<ProgramDayOut>({
    queryKey: ["programDay", dayId],
    queryFn: () => workoutService.getDayById(dayId),
    enabled: enabled && Boolean(dayId),
  });
};
