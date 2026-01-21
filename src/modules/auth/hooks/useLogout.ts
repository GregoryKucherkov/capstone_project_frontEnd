import { logoutUserApi } from "@/modules/auth/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem("refreshToken") || "";
      return logoutUserApi(refreshToken);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["auth"] });

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      queryClient.setQueryData(["auth", "me"], null);
      queryClient.removeQueries({ queryKey: ["auth"] });

      navigate("/", { replace: true });
    },

    onError: (err) => {
      navigate("/");

      if (err instanceof Error) {
        console.warn(
          "Logout server-side failed, but local session cleared:",
          err.message,
        );
      }
    },
  });
};

// version 2
// export const useLogout = () => {
//     const queryClient = useQueryClient();
//     const navigate = useNavigate();

//     return useMutation({
//         mutationFn: () => {
//             const refreshToken = localStorage.getItem("refreshToken") || "";
//             return logoutUserApi(refreshToken);
//         },
//         onSuccess: () => {
//             // 1. Clear ALL local storage
//             localStorage.removeItem("token");
//             localStorage.removeItem("refreshToken");

//             // 2. Wipe the ENTIRE React Query cache, NUKE option (Workouts, Stats, User, etc.)
//             queryClient.clear();

//             // 3. Send them home
//             navigate("/", { replace: true });
//         },
//         onError: (err) => {
//             // Even if the server-side logout fails (e.g., expired refresh token),
//             // we must still clear the local app state.
//             localStorage.clear();
//             queryClient.clear();
//             navigate("/", { replace: true });
//         }
//     });
// };
