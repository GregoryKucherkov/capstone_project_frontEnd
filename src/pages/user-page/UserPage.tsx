import Container from "@/shared/ui/container/Container";
import { useParams } from "react-router-dom";
import css from "./UserPage.module.css"
// import { Button } from "@/shared/ui/button/Button";
import { Typography } from "@/shared/ui/typography/Typography";
import { useUser } from "@/shared/hooks/use-user";
import { UserInfo } from "@/modules/user/components/user-info/UserInfo";
import { useUpdateAvatar } from "@/shared/hooks/useUpdateAvatar";
import { useProfileUser } from "@/shared/hooks/useProfileUser";
import { Button } from "@/shared/ui/button/Button";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import type { FavoriteResponse, PostsResponse, User, UserGuest, UserListResponse } from "@/shared/types/api";
import { useFollow, useUnfollow } from "@/shared/hooks/useSocial";
import { TabsList } from "@/modules/user/components/tab-list/TabList";
import { useProfileData } from "@/modules/user/hooks/useProfileData";
import { useState } from "react";
import { TabKey, type TabKeyType } from "@/shared/constants/tabData";
import { ListItems, type ListItem } from "@/modules/user/components/list-items/ListItems";


function isUserGuest(user: User | UserGuest): user is UserGuest {
  return "is_followed" in user;
}



export const UserPage = () => {
    const { id } = useParams();
    const userId = id ? Number(id) : undefined;

    const {user: authUser } = useUser()
    const { mutate: updateAvatar } = useUpdateAvatar();
    const { mutate: logout } = useLogout();
    const { data: viewedUser, isLoading: isViewedUserLoading } = useProfileUser(userId);
    const { mutate: unfollow } = useUnfollow();
    const { mutate: follow } = useFollow();

    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState<TabKeyType>(TabKey.POSTS);


    // const isMyProfile = authUser?.id.toString() === id;
    const isMyProfile = authUser?.id === userId;

    const profileUser = isMyProfile ? authUser : viewedUser;

    // Fetch the Tab Content
    const { data, isLoading: ProfileDataLoading} = useProfileData(
        userId!, 
        page, 
        activeTab
    );

    const tabData: ListItem[] = (() => {
        if (!data) return [];

        switch (activeTab) {
            case TabKey.POSTS:
            return (data as PostsResponse).posts ?? [];
            case TabKey.FAVORITES:
            return data as FavoriteResponse[];
            case TabKey.FOLLOWERS:
            case TabKey.FOLLOWING:
            return (data as UserListResponse).items ?? [];
            default:
            return [];
        }
        })();

    if (isViewedUserLoading) return <p>Loading Profile...</p>;
    if (!profileUser) return <p>User not found</p>;



    const handleAvatarChange = (file: File) => {
        if (!isMyProfile) return;
        updateAvatar(file); 
    };

    const handleOpenLogOut = () => {
        logout()
    }

    const handleUnFollow = () => {
        if (!profileUser.id) return;
        unfollow(profileUser.id);
    };
    

    const handleFollow = () => {
        if (!profileUser?.id) return;
        follow(profileUser.id);
    };



    return (
        <Container className={css.container}>

            <div> Back button</div>
            <Typography variant="h2" className={css.title}>
                Profile
            </Typography>

            <div className={css.profileContainer}>
                <div className={css.profile}>
                        <UserInfo
                            user={profileUser}
                            isMyProfile={isMyProfile}
                            onAvatarChange={handleAvatarChange}
                        />

                {isMyProfile ? (
                    <Button
                        variant="dark"
                        bordered={true}
                        size="medium"
                        onClick={handleOpenLogOut}
                    >
                    LOG OUT
                    </Button>
                ) : isUserGuest(profileUser) && profileUser.isFollowed ? (
                    <Button
                        variant="dark"
                        size="medium"
                        bordered={true}
                        onClick={handleUnFollow}
                    >
                    FOLLOWING
                    </Button>
                ) : (
                    <Button
                        variant="dark"
                        size="medium"
                        bordered={true}
                        onClick={handleFollow}
                    >
                    FOLLOW
                    </Button>
                )}
                </div>
                <div className={css.profileTabs}>
                    <TabsList
                        isMyProfile={isMyProfile}
                        activeTab={activeTab}
                        onTabChange={(tab) => { setActiveTab(tab); setPage(1); }}
                    />
                    <ListItems
                        tab={activeTab}
                        items={tabData}
                        isMyProfile={isMyProfile}
                        onFollow={handleFollow}
                        onUnFollow={handleUnFollow}
                        loading={ProfileDataLoading}
                    />
                </div>
        </div>

        </Container>
    )
}