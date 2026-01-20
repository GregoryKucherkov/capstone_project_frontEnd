
import { userService } from "@/shared/api/userApi";
import { TabKey, type TabKeyType } from "@/shared/constants/tabData";
import type { FavoriteResponse, ListItem, PostsResponse, UserListResponse } from "@/shared/types/api";

export type ProfileTabConfig<T> = {
  query: (userId: number, skip: number, limit: number) => Promise<T>;
  normalize: (data: T) => ListItem[];
};

export const PROFILE_TABS: {
  [K in TabKeyType]: ProfileTabConfig<
    K extends typeof TabKey.POSTS
      ? PostsResponse
      : K extends typeof TabKey.FAVORITES
      ? FavoriteResponse[]
      : UserListResponse
  >;
} = {
  [TabKey.POSTS]: {
    query: (userId, skip, limit) =>
      userService.getPosts(userId, skip, limit),
    normalize: data => data.posts,
  },

  [TabKey.FOLLOWERS]: {
    query: (userId, skip, limit) =>
      userService.getFollowers(userId, skip, limit),
    normalize: data => data.items,
  },

  [TabKey.FOLLOWING]: {
    query: (userId, skip, limit) =>
      userService.getFollowing(userId, skip, limit),
    normalize: data => data.items,
  },

  [TabKey.FAVORITES]: {
    query: (_, skip, limit) =>
      userService.getFavorites(skip, limit),
    normalize: data => data,
  },
};
