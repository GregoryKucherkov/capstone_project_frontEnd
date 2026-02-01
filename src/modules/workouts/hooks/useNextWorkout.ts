import { useQuery } from "@tanstack/react-query";
import { workoutService } from "../services/workoutService";

export const useNextWorkout = () => {
  const today = new Date().toLocaleDateString("en-CA");

  const endOfWeek = new Date();
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  const endDate = endOfWeek.toLocaleDateString("en-CA");

  // 1. Fetch Schedule
  const { data: schedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ["schedule", today, endDate],
    queryFn: () => workoutService.getSchedule(today, endDate),
  });

  const nextPlanned = schedule?.[0];
  const dayId = nextPlanned?.program_day_id;

  // 2. Fetch Day Details (only if we have a dayId from the schedule)
  const { data: workoutData, isLoading: dayLoading } = useQuery({
    queryKey: ["workoutDay", dayId],
    queryFn: () => workoutService.getDayById(dayId!),
    enabled: !!dayId, // This prevents the call if dayId is missing
  });

  // 3. Fetch Session History
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => workoutService.listSessions(),

    select: (data) => data.workouts,
  });

  // Combined Loading State
  const isLoading = scheduleLoading || dayLoading || sessionsLoading;

  return {
    workoutData,
    sessions,
    isLoading,
    hasWorkout: !!dayId,
  };
};
