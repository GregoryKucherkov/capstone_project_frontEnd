import { baseFetch } from "@/shared/api/baseApi";
import type { UserGuest } from "@/shared/types/api";



export const userService = {
    changeAvatar: (file: File) => {
        const formData = new FormData()
        formData.append("file", file);

        return baseFetch(`/users/me/avatar`, {
            method: "PATCH",
            body: formData,
        });
    },

    getUserById: (id: string): Promise<UserGuest> => {
    return baseFetch(`/users/${id}`);
  },
}