import { baseFetch } from "@/shared/api/baseApi";
import type {
  FavoriteResponse,
  PostsResponse,
  User,
  UserGuest,
  UserListResponse,
} from "@/shared/types/api";

export const userService = {
  changeAvatar: (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append("file", file);

    return baseFetch(`/users/me/avatar`, {
      method: "PATCH",
      body: formData,
    });
  },

  getUserById: (id: string | number): Promise<UserGuest> => {
    return baseFetch(`/users/${Number(id)}`);
  },

  unfollowUser: (id: number) => {
    return baseFetch(`/users/${id}/unfollow`, {
      method: "DELETE",
    });
  },

  followUser: (id: number) => {
    return baseFetch(`/users/${id}/follow`, {
      method: "POST",
    });
  },

  getFollowers: (
    id: number,
    skip: number,
    limit: number,
  ): Promise<UserListResponse> => {
    return baseFetch(`/users/${id}/followers?skip=${skip}&limit=${limit}`);
  },
  getFollowing: (
    id: number,
    skip: number,
    limit: number,
  ): Promise<UserListResponse> => {
    return baseFetch(`/users/${id}/following?skip=${skip}&limit=${limit}`);
  },

  getPosts: (
    id: number,
    skip: number,
    limit: number,
  ): Promise<PostsResponse> => {
    return baseFetch(`/users/${id}/posts?skip=${skip}&limit=${limit}`);
  },
  getFavorites: (skip: number, limit: number): Promise<FavoriteResponse[]> => {
    return baseFetch(`/users/me/favorite?skip=${skip}&limit=${limit}`);
  },

  addFavoriteExe: (exercise_id: number) => {
    return baseFetch(`/users/me/favorite`, {
      method: "POST",
      body: JSON.stringify({
        exercise_id: exercise_id,
      }),
    });
  },
};
