import { logService } from "@/modules/workouts/services/logService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logService.createSession(),
    onSuccess: () => {
      // Refetch the cached list of sessions
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: number) => logService.cancelSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};

export const useFinishSession = () => {
  return useMutation({
    mutationFn: (params: {
      sessionId: number;
      data: { duration: number; notes?: string };
    }) => logService.finishSession(params.sessionId, params.data),
  });
};

export const useAddExercise = () => {
  return useMutation({
    mutationFn: (params: {
      sessionId: number;
      data: { name: string; notes?: string; planned_exercise_id?: number };
    }) => logService.addExercise(params.sessionId, params.data),
  });
};

export const useAddSet = () => {
  return useMutation({
    mutationFn: (params: {
      exerciseId: number;
      data: {
        reps: string;
        weight?: number;
        rest_seconds?: number;
        notes?: string;
        completed?: boolean;
      };
    }) => logService.addSet(params.exerciseId, params.data),
  });
};

export const useAddSetBulk = () => {
  return useMutation({
    mutationFn: (params: {
      exerciseId: number;
      data: {
        reps: string;
        weight?: number;
        rest_seconds?: number;
        notes?: string;
        completed?: boolean;
      }[];
    }) => logService.addSetBulk(params.exerciseId, params.data),
  });
};

export const useWorkouts = (skip: number, limit: number) => {
  return useQuery({
    queryKey: ["workouts", skip, limit],
    queryFn: () => logService.listWorkouts(skip, limit),
  });
};
