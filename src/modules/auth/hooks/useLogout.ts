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

        onSettled: () => {
            // Final safety sync
            queryClient.invalidateQueries({ queryKey: ["auth"] });
            
        },
        onError: (err) => {
            localStorage.clear();
            queryClient.clear();
            navigate("/");

            if (err instanceof Error) {
                console.warn("Logout server-side failed, but local session cleared:", err.message);
            }
        }
    })
}