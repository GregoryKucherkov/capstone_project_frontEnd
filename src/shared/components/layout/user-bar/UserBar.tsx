import css from "./UserBar.module.css"

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import clsx from "clsx";
import { useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg?react";
import { useUser } from "@/shared/hooks/use-user";
import { Avatar } from "@/shared/ui/avatar/Avatar";

interface ProfileMenuProps {
    onClose: () => void

}

const ProfileMenu = ({ onClose }: ProfileMenuProps) => {
  const { user } = useUser();
  const [, setSearchParams] = useSearchParams();
  

  return (
    <div className={css.popover}>
      <NavLink to={`/user/${user?.id}`} className={css.link} onClick={onClose}>
        Profile
      </NavLink>

      <button
        type="button"
        className={clsx(css.link, css.logoutButton)}
        onClick={() => {
            setSearchParams({ modal: "logout" });
            onClose();
        }}
      >
        Log out
        <ArrowUpRightIcon className={css.logoutIcon} />
      </button>
    </div>
  );
};


export const UserBar = () => {


    const { user } = useUser();
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobile = ["mobile", "small-mobile"].includes(breakpoint);
    const containerRef = useRef(null);

    const userName = user?.name || "User";


    return (

        <div className={css.container} ref={containerRef}>
        <div
            className={css.profile}
            onClick={() => setIsOpenProfile((prev) => !prev)}
        >
            <div style={{ flexShrink: 0 }}>
            <Avatar
                src={user?.avatar}
                alt={`${userName}'s avatar`}
                size={isMobile ? 32 : 50}
                name={userName}
            />
            </div>
            <p className={css.profileName}>{userName}</p>
            <button
            type="button"
            className={clsx(css.button, isOpenProfile && css.buttonOpen)}
            >
            <ChevronDownIcon className={css.arrowIcon} />
            </button>
        </div>

        {isOpenProfile && <ProfileMenu onClose={() => setIsOpenProfile(false)} />}
        </div>
    );
}