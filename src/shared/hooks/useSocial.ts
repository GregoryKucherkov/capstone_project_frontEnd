import { userService } from "@/shared/api/userApi";
import type { UserGuest } from "@/shared/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";




export const useUnfollow = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.unfollowUser(id),
    onSuccess: (id: number) => {
      // update the cached user so `is_followed` reflects the change
      queryClient.setQueryData(["user", id], (oldData: UserGuest | undefined) =>
        oldData ? { ...oldData, is_followed: false } : oldData
      );
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Failed to unfollow user";
      toast.error(message);
    },
  });
};


export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.followUser(id),
    onSuccess: (id: number) => {
      queryClient.setQueryData(["user", id], (oldData: UserGuest | undefined) =>
        oldData ? { ...oldData, is_followed: true } : oldData
      );
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Failed to follow user";
      toast.error(message);
    },
  });
};