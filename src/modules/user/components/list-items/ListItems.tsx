import { emptyTabMessagesForOwner, emptyTabMessagesForUser, TabKey, type TabKeyType } from "@/shared/constants/tabData";
import { Typography } from "@/shared/ui/typography/Typography";
import css from "./ListItems.module.css"
import { PostPreview } from "@/modules/social/components/post-preview/PostPreview";
import { UserCard } from "@/modules/user/components/user-card/UserCard";
import type { FavoriteResponse, Post, UserGuest } from "@/shared/types/api";


export type ListItem =
  | Post
  | UserGuest
  | FavoriteResponse;


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

        const messages = isMyProfile ? emptyTabMessagesForOwner : emptyTabMessagesForUser;
        const message = messages[tab as keyof typeof messages] ?? "No data found.";


        return (
            <Typography textColor="black" className={css.notFoundMsg}>
                {message}
            </Typography>
        )
    }


    return (
        <div className={css.listContainer}>
            {items.map((item) => {
                // Posts tab
            if (tab === TabKey.POSTS) {
                const post = item as Post;
                return <PostPreview key={post.id} post={post} />;
            }

            // Favorites tab (exercises)
            if (tab === TabKey.FAVORITES) {
                const fav = item as FavoriteResponse;
                return (
                <div key={`${fav.user_id}-${fav.exercise_id}`}>
                    Exercise #{fav.exercise_id}
                </div>
                );
            }

            // followers / following
            const user = item as UserGuest;
            return (
                <UserCard
                    key={user.id}
                    user={user}
                    tabType={tab}
                    onFollow={onFollow}
                    onUnfollow={onUnFollow}
                    loading={loading}
                    posts={post}
                />
            );
            })}
        </div>
    )
}