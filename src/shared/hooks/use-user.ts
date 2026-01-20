import { getCurrentUser } from "@/modules/auth/api/authApi";
import { useQuery } from "@tanstack/react-query";



export const useUser = () => {
  const hasToken = !!localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    enabled: hasToken,
    retry: false, // Don't retry if the user isn't logged in (401)
    staleTime: Infinity, // The user doesn't change unless they logout/login
  });

  return {
    user: data ?? null,
    isLoading,
    isLoggedIn: !!data,
    isError,

  };
};