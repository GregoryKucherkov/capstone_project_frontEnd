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


export const UserPage = () => {
    const { id } = useParams();
    const {user: authUser, isLoading: isAuthLoading} = useUser()
    const { mutate: updateAvatar } = useUpdateAvatar();

    const { data: viewedUser, isLoading: isViewedUserLoading } = useProfileUser(id);


    const isMyProfile = !id || (authUser ? id === authUser.id.toString() : false);

    const profileUser = isMyProfile ? authUser : viewedUser;


    
    const handleAvatarChange = (file: File) => {
        if (!isMyProfile) return;

        updateAvatar(file); 
    };

    if (
        isAuthLoading ||
        (id && isViewedUserLoading) ||
        !profileUser
    
        ) {
            return <p>Loading...</p>;
        }




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
                ) : profileUser.isFollowed ? (
                    <Button
                        variant="dark"
                        size="medium"
                        bordered={true}
                        onClick={() => handleUnFollow(id)}
                    >
                    FOLLOWING
                    </Button>
                ) : (
                    <Button
                        variant="dark"
                        size="medium"
                        bordered={true}
                        onClick={() => handleFollow(id)}
                    >
                    FOLLOW
                    </Button>
                )}
                </div>
        </div>

        </Container>
    )
}