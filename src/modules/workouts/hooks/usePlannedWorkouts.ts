import { workoutService } from "@/modules/workouts/services/workoutService";
import type { PlannedWorkoutProps } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";

type UseProgramScheduleArgs = {
  startDate: string;
  endDate: string;
};

export const useProgramSchedule = ({
  startDate,
  endDate,
}: UseProgramScheduleArgs) => {
  return useQuery<PlannedWorkoutProps[]>({
    queryKey: ["schedule", startDate, endDate],
    queryFn: () => workoutService.getSchedule(startDate, endDate),
    enabled: Boolean(startDate && endDate),
  });
};
