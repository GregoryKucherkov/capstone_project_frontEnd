import {
  nutritionService,
  type DailyNutrition,
} from "@/modules/workouts/services/nutritionService";
import { useQuery } from "@tanstack/react-query";

export const useDailyNutrition = () => {
  const todayStr = new Date().toISOString().split("T")[0];

  const { data: meals = [], isLoading } = useQuery<DailyNutrition[]>({
    queryKey: ["nutrition-daily", todayStr],
    queryFn: () => nutritionService.listDailyNutrition(todayStr),
  });

  const totalToday = meals.reduce(
    (acc: number, item: DailyNutrition) => acc + (item.calories || 0),
    0,
  );

  return {
    meals,
    totalToday,
    isLoading,
  };
};
