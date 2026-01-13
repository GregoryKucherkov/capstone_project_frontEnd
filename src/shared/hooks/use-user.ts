import { getCurrentUser } from "@/modules/auth/api/authApi";
import { useQuery } from "@tanstack/react-query";



export const useUser = () => {
  const hasToken = !!localStorage.getItem("token");


  const { data, isLoading, isError } = useQuery({
    // queryKey: ["user"],
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    enabled: hasToken,
    retry: false, // Don't retry if the user isn't logged in (401)
    staleTime: Infinity, // The user doesn't change unless they logout/login
  });

  return {
    isLoggedIn: hasToken ? !!data : false,
    user: data || null,
    // isLoggedIn: !!data, //  If data exists, they are logged in
    isLoading,
    isError,

  };
};