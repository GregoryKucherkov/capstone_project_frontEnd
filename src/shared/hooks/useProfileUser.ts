import { userService } from "@/shared/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useProfileUser = (id?: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
  });
};
