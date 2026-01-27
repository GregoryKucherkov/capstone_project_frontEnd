import clsx from "clsx";
import css from "./TabList.module.css";
import { Button } from "@/shared/ui/button/Button";
import {
  tabsForOwner,
  tabsForUser,
  type TabKeyType,
} from "@/shared/constants/tabData";

export interface TabListProps {
  isMyProfile: boolean;
  activeTab: TabKeyType;
  onTabChange: (tabKey: TabKeyType) => void;
}

export const TabsList = ({
  isMyProfile,
  activeTab,
  onTabChange,
}: TabListProps) => {
  const tabs = isMyProfile ? tabsForOwner : tabsForUser;

  return (
    <div className={css.tabs}>
      {tabs.map(({ key, label }) => (
        <Button
          key={key}
          onClick={() => onTabChange(key)}
          className={clsx(css.tab, {
            [css.active]: activeTab === key,
          })}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
