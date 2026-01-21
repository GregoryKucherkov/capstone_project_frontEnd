import {
  emptyTabMessagesForOwner,
  emptyTabMessagesForUser,
  type TabKeyType,
} from "@/shared/constants/tabData";
import { Typography } from "@/shared/ui/typography/Typography";
import css from "./ListItems.module.css";
import { PostPreview } from "@/modules/social/components/post-preview/PostPreview";
import { UserCard } from "@/modules/user/components/user-card/UserCard";
import type { ListItem, UserGuest } from "@/shared/types/api";

export interface ListItemsProps {
  tab: TabKeyType;
  items: ListItem[];
  isMyProfile: boolean;
  loading: boolean;
  onFollow: () => void;
  onUnFollow: () => void;
}

export const ListItems = ({
  tab,
  items,
  isMyProfile,
  onFollow,
  onUnFollow,
  loading,
}: ListItemsProps) => {
  if (!items || items.length === 0) {
    const messages = isMyProfile
      ? emptyTabMessagesForOwner
      : emptyTabMessagesForUser;
    const message = messages[tab as keyof typeof messages] ?? "No data found.";

    return (
      <Typography textColor="black" className={css.notFoundMsg}>
        {message}
      </Typography>
    );
  }

  return (
    <div className={css.listContainer}>
      {items.map((item) => {
        // Posts tab
        if ("body" in item) {
          return <PostPreview key={item.id} post={item} />;
        }

        // Favorites tab (exercises)
        if ("exercise_id" in item) {
          return (
            <div key={`${item.user_id}-${item.exercise_id}`}>
              Exercise #{item.exercise_id}
            </div>
          );
        }

        // followers / following
        const user = item as UserGuest;
        return (
          <UserCard
            key={user.id}
            user={user}
            tabType={tab as "followers" | "following"}
            onFollow={onFollow}
            onUnfollow={onUnFollow}
            loading={loading}
          />
        );
      })}
    </div>
  );
};
