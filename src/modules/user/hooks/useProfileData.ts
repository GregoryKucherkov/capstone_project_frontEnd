import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { type TabKeyType } from "@/shared/constants/tabData";

import { PROFILE_TABS } from "@/modules/user/config/profileTabs.config";
import type { ListItem } from "@/shared/types/api";

export const useProfileData = <TTab extends TabKeyType>(
  userId: number,
  page: number,
  activeTab: TTab,
  limit = 10,
) => {
  const { query, normalize } = PROFILE_TABS[activeTab];
  const skip = (page - 1) * limit;

  return useQuery<ListItem[], Error>({
    queryKey: ["user", userId, activeTab, page],
    queryFn: async () => {
      const raw = await query(userId, skip, limit);
      return normalize(raw);
    },
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
};
