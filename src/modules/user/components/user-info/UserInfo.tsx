import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import type { User, UserGuest } from "@/shared/types/api"
import { useRef } from "react";
import css from "./UserInfo.module.css"
import { Avatar } from "@/shared/ui/avatar/Avatar";
import { normalizeImagePath } from "@/shared/utils/normalizeImagePath";
import { ButtonIcon } from "@/shared/ui/button-icon/ButtonIcon";
import PlusIcon from "@/assets/icons/plus.svg?react"
import toast from "react-hot-toast";
import { Typography } from "@/shared/ui/typography/Typography";



export interface UserInfoProps {
    user: User | UserGuest;
    isMyProfile: boolean;
    onAvatarChange: (file: File)=> void;
}


export const UserInfo = ({user, isMyProfile, onAvatarChange}: UserInfoProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const breakpoint = useBreakpoint();
    const isMobile = ["mobile", "small-mobile"].includes(breakpoint);

    const {name, description, avatar} = user


    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        onAvatarChange(file);
    };




    return (
        <div className={css.profileCard}>
            <div className={css.avatarWrapper}>
                <Avatar
                    src={normalizeImagePath(avatar)}
                    alt={`${name}'s avatar`}
                    size={isMobile ? 80 : 120}
                    name={name}
                    />
                    {isMyProfile && (
                        <>
                        <ButtonIcon
                            className={css.avatarEdit}
                            variant="dark"
                            icon={<PlusIcon width={16} height={16} />}
                            size="small"
                            onClick={handleAvatarClick}
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className={css.fileInput}
                            />
                        </>
                    )}
            </div>
            <Typography variant="h3">{name}</Typography>
        </div>
    )
}