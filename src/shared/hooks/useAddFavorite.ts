import { userService } from "@/shared/api/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// optimistic update used
export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exerciseId: number) => userService.addFavoriteExe(exerciseId),

    onMutate: async (exerciseId) => {
      await queryClient.cancelQueries({ queryKey: ["favoriteIds"] });

      const prev = queryClient.getQueryData<number[]>(["favoriteIds"]);

      queryClient.setQueryData<number[]>(["favoriteIds"], (old = []) => [
        ...old,
        exerciseId,
      ]);

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["favoriteIds"], ctx.prev);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteIds"] });
    },
  });
};

export const useGetfavorite = (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["favorites", skip, limit],
    queryFn: () => userService.getFavorites(skip, limit),
  });
  return {
    exercises: data?.exercises || [],
    totalCount: data?.total_count || 0,
    isLoading,
    isError,
  };
};

// optimistic update used
export const useDelExeFromFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exerciseId: number) =>
      userService.deleteExeFromFavaorite(exerciseId),

    onMutate: async (exerciseId) => {
      await queryClient.cancelQueries({ queryKey: ["favoriteIds"] });

      const prev = queryClient.getQueryData<number[]>(["favoriteIds"]);

      queryClient.setQueryData<number[]>(["favoriteIds"], (old = []) =>
        old.filter((id) => id !== exerciseId),
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["favoriteIds"], ctx.prev);
      }
    },

    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteIds"] });
    },
  });
};

export const useFavoriteIds = (
  exerciseIds: number[],
  skip: number = 0,
  limit: number = 100,
) => {
  return useQuery({
    queryKey: ["favoriteIds", skip, limit],
    queryFn: async () => {
      if (exerciseIds.length === 0) return [];

      const res = await userService.getFavorites(skip, limit);
      const allIds = res.exercises.map((e) => e.id);

      return allIds.filter((id) => exerciseIds.includes(id));
    },
    staleTime: 5 * 60 * 1000,
  });
};
