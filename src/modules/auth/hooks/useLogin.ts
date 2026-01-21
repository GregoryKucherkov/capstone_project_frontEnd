import { loginUserApi } from "@/modules/auth/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUserApi,
    onSuccess: async (data) => {
      // 1. Save token to localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      // data.token_type is also available ("bearer")
      if (data.user) {
        queryClient.setQueryData(["auth", "me"], data.user);
      }
    },
    onError: (error) => {
      // Global logic for login errors
      console.error("Login failed:", error);
    },
  });
};
