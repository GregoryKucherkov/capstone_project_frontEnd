import { goalsService } from "@/modules/user/services/goalsService";
import { useQuery } from "@tanstack/react-query";

export const useGoals = () => {
  const {
    data: goals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: () => goalsService.getGoals(0, 10),
  });

  return {
    goals: goals || [], // Ensure it's always an array
    isLoading,
    error,
  };
};
