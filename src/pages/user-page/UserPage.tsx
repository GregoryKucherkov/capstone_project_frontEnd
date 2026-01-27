import Container from "@/shared/ui/container/Container";
import { Link, useLocation, useParams } from "react-router-dom";
import css from "./UserPage.module.css";
import { Typography } from "@/shared/ui/typography/Typography";
import { useUser } from "@/shared/hooks/use-user";
import { UserInfo } from "@/modules/user/components/user-info/UserInfo";
import { useUpdateAvatar } from "@/shared/hooks/useUpdateAvatar";
import { useProfileUser } from "@/shared/hooks/useProfileUser";
import { Button } from "@/shared/ui/button/Button";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { useFollow, useUnfollow } from "@/shared/hooks/useSocial";
import { TabsList } from "@/modules/user/components/tab-list/TabList";
import { useProfileData } from "@/modules/user/hooks/useProfileData";
import { useState } from "react";
import { TabKey, type TabKeyType } from "@/shared/constants/tabData";
import { ListItems } from "@/modules/user/components/list-items/ListItems";
import ArrBack from "@/assets/icons/arrow-left.svg?react";
import Loader from "@/shared/ui/loader/Loader";

export const UserPage = () => {
  const { id } = useParams();

  const location = useLocation();
  const backPath = location.state?.from || "/";

  const userId = Number(id);
  const { user: authUser, isLoading: isAuthLoading } = useUser();
  const isMyProfile = authUser?.id === userId;

  const { data: viewedUser, isLoading: isViewedUserLoading } = useProfileUser(
    isMyProfile ? undefined : userId,
  );

  const profileUser = isMyProfile ? authUser : viewedUser;

  const { mutate: updateAvatar } = useUpdateAvatar();
  const { mutate: logout } = useLogout();
  const { mutate: unfollow } = useUnfollow();
  const { mutate: follow } = useFollow();

  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKeyType>(TabKey.POSTS);

  // Fetch the Tab Content
  const { data: tabData = [], isLoading: ProfileDataLoading } = useProfileData(
    userId,
    page,
    activeTab,
  );

  if (isAuthLoading || isViewedUserLoading) {
    return <Loader />;
  }

  if (!profileUser) return <p>User not found</p>;

  const isFollowing = !isMyProfile && !!profileUser.isFollowed;

  const handleAvatarChange = (file: File) => {
    if (!isMyProfile) return;
    updateAvatar(file);
  };

  const handleOpenLogOut = () => {
    logout();
  };

  const handleUnFollow = (id: number) => {
    unfollow(id);
  };

  const handleFollow = (id: number) => {
    follow(id);
  };

  return (
    <Container className={css.container}>
      <div className={css.backBtn}>
        <Link to={backPath} className={css.goBack}>
          <ArrBack />
        </Link>
      </div>
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
          ) : (
            <Button
              variant="dark"
              bordered
              // onClick={isFollowing ? handleUnFollow : handleFollow}
              onClick={() =>
                isFollowing
                  ? handleUnFollow(profileUser.id)
                  : handleFollow(profileUser.id)
              }
            >
              {isFollowing ? "FOLLOWING" : "FOLLOW"}
            </Button>
          )}
        </div>
        <div className={css.profileTabs}>
          <TabsList
            isMyProfile={isMyProfile}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setPage(1);
            }}
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
  );
};
