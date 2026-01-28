import { userService } from "@/shared/api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exerciseId: number) => userService.addFavoriteExe(exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      console.error("Failed to add favorite:", error.message);
    },
  });
};
