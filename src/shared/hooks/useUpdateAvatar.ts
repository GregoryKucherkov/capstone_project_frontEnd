import { userService } from "@/shared/api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";



export const useUpdateAvatar = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => userService.changeAvatar(file),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["auth", "me"], updatedUser);
            queryClient.setQueryData(["user", updatedUser.id], updatedUser);
            toast.success("Avatar updated successfully!");
        },
        onError: (err: unknown) => {
            const message = err instanceof Error ? err.message : "Failed to update avatar";
            toast.error(message);
        }
    })
}