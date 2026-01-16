import { userService } from "@/shared/api/userApi";
import type { UserGuest } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";



export const useProfileUser = (id?: string) => {
  return useQuery<UserGuest>({
    queryKey: ["user", id],
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
  });
};