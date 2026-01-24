import { userService } from "@/shared/api/userApi";
import { TabKey } from "@/shared/constants/tabData";
import type { UserGuest } from "@/shared/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUnfollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.unfollowUser(id),
    onSuccess: (_data, id) => {
      // 1️⃣ Update profile header
      queryClient.setQueryData(
        ["user", id],
        (old: UserGuest | undefined) =>
          old ? { ...old, isFollowed: false } : old
      );

      queryClient.invalidateQueries({
        queryKey: ["user", id, TabKey.FOLLOWERS],
      });
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Failed to unfollow user";
      toast.error(message);
    },
  });
};

// export const useFollow = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: number) => userService.followUser(id),
//     onSuccess: (id: number) => {
//       queryClient.setQueryData(
//         ["user", id],
//         (oldData: UserGuest | undefined) =>
//           oldData ? { ...oldData, is_followed: true } : oldData,
//       );
//       queryClient.invalidateQueries({ queryKey: ["user", id] });
//     },
//     onError: (err: unknown) => {
//       const message =
//         err instanceof Error ? err.message : "Failed to follow user";
//       toast.error(message);
//     },
//   });
// };

export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.followUser(id),
    // data = the API response, id = the number  passed in
    onSuccess: (_data, id) => {
      // 1. Manual Cache Update
      queryClient.setQueryData(
        ["user", id],
        (oldData: UserGuest | undefined) =>
          oldData ? { ...oldData, isFollowed: true } : oldData,
      );

      // 2. Refresh both Profile and Tabs
    
      // queryClient.invalidateQueries({ 
      //   queryKey: ["user"] 
      // });
      queryClient.invalidateQueries({ queryKey: ["user", id, TabKey.FOLLOWERS] });
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Failed to follow user";
      toast.error(message);
    },
  });
};
