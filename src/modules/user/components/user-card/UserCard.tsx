import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useNavigate } from "react-router-dom";
import css from "./UserCard.module.css";
import { Avatar } from "@/shared/ui/avatar/Avatar";
import { normalizeImagePath } from "@/shared/utils/normalizeImagePath";
import { Typography } from "@/shared/ui/typography/Typography";
import { Button } from "@/shared/ui/button/Button";
import { ButtonIcon } from "@/shared/ui/button-icon/ButtonIcon";
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg?react";
import type { UserGuest } from "@/shared/types/api";

export interface UserCardProps {
  user: UserGuest;
  onFollow: (id: number) => void;
  onUnfollow: (id: number) => void;
  loading: boolean;
  userPageBasePath?: string;
  // posts?: Post[]
}

export const UserCard = ({
  user,
  onFollow,
  onUnfollow,
  userPageBasePath = "/user",
  loading = false,
}: UserCardProps) => {
  const breakpoint = useBreakpoint();
  const navigate = useNavigate();

  // const isFollowing = tabType === "following" || (user.isFollowed ?? false);
  const isFollowing = !!user.isFollowed;

  const handleNavigateToUser = () => {
    navigate(`${userPageBasePath}/${user.id}`);
  };

  const handleToggleFollow = () => {
    if (isFollowing) {
      onUnfollow(user.id);
    } else {
      onFollow(user.id);
    }
  };

  //  if i would wwant to render last posts of user(need to change backend out)
  // const showPosts = breakpoint === "tablet" || breakpoint === "desktop";
  // const thumbCount = breakpoint === "desktop" ? 4 : 3;
  const iconSize = breakpoint === "desktop" ? "medium" : "small";
  const buttonSize = breakpoint === "desktop" ? "medium" : "small";

  return (
    <div className={css.card}>
      <div className={css.userInfo}>
        <Avatar
          src={normalizeImagePath(user.avatar)}
          name={user.name}
          size={breakpoint === "mobile" ? 60 : 85}
        />
        <div className={css.userDetails}>
          <Typography variant="h4" truncate>
            {user.name}
          </Typography>
          <Typography variant="bodyS" textColor="gray">
            Own posts: "some amount"
          </Typography>
          <Button
            variant="light"
            bordered
            fullWidth
            size={buttonSize}
            onClick={handleToggleFollow}
            disabled={loading}
            className={css.followButton}
          >
            {isFollowing ? "FOLLOWING" : "FOLLOW"}
          </Button>
        </div>
      </div>

      <div className={css.arrowButton}>
        <ButtonIcon
          icon={<ArrowUpRight />}
          variant="light"
          size={iconSize}
          onClick={handleNavigateToUser}
        />
      </div>
    </div>
  );
};
