export const TabKey = {
  POSTS: "Posts",
  FOLLOWERS: "followers",
  FOLLOWING: "following",
  FAVORITES: "favorites",
} as const;


export type TabKeyType = typeof TabKey[keyof typeof TabKey];



export const tabsForOwner = [
  { key: TabKey.POSTS, label: "Posts" },
  { key: TabKey.FOLLOWERS, label: "Followers" },
  { key: TabKey.FOLLOWING, label: "Following" },
  { key: TabKey.FAVORITES, label: "My Favorites" },
];

export const tabsForUser = [
  { key: TabKey.POSTS, label: "Posts" },
  { key: TabKey.FOLLOWERS, label: "Followers" },
  { key: TabKey.FOLLOWING, label: "Following" }
];

export const emptyTabMessagesForOwner: Record<TabKeyType, string> = {
  [TabKey.POSTS]: "Nothing has been added to your posts yet!",
  [TabKey.FOLLOWERS]: "There are currently no followers on your account. Please engage our visitors with interesting workouts and draw their attention to your profile.",
  [TabKey.FOLLOWING]: "Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.",
  [TabKey.FAVORITES]: "Nothing has been added to your favorite workouts list yet. Please browse workouts and add your favorites for easy access in the future.",
};

type PublicTabKey = typeof TabKey.POSTS | typeof TabKey.FOLLOWERS;


export const emptyTabMessagesForUser: Record<PublicTabKey, string> = {
  [TabKey.POSTS]: "This user hasn't added any posts yet. Check back later to see if they've shared something!",
  [TabKey.FOLLOWERS]: "No one is following this user yet. Be the first to follow and stay updated on their activity.",
};