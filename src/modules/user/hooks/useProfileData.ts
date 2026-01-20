import { userService } from "@/shared/api/userApi";
import type { FavoriteResponse, PostsResponse, UserListResponse } from "@/shared/types/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {TabKey, type TabKeyType} from "@/shared/constants/tabData"

type ProfileTabData = UserListResponse | PostsResponse | FavoriteResponse[];


export const useProfileData = (userId: number, page: number, activeTab: TabKeyType, limit: number = 10) => {
    return useQuery<ProfileTabData, Error>({
        queryKey: ["user", userId, activeTab, page],
        queryFn: () => {
            const skip = (page - 1) * limit;

            if (activeTab === TabKey.FOLLOWERS) 
                return userService.getFollowers(userId, skip, limit);
            if (activeTab === TabKey.FOLLOWING) 
                return userService.getFollowing(userId, skip, limit);
            if (activeTab === TabKey.POSTS) 
                return userService.getPosts(userId, skip, limit);
            if (activeTab === TabKey.FAVORITES)
                return userService.getFavorites(skip, limit)

            throw new Error("Unknown tab key");
        },
        enabled: !!userId,
        placeholderData: keepPreviousData,
    })
}