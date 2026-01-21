import { registerUserApi } from "@/modules/auth/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useRegister = () => {
//   return useMutation({
//     mutationFn: registerUserApi,
//   });
// };

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUserApi,
    onSuccess: (data) => {
      // Save tokens so the user is "Logged In"
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      // Push user data into cache so the UI updates immediately
      if (data.user) {
        queryClient.setQueryData(["auth", "me"], data.user);
      }

      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
};
