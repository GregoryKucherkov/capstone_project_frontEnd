import { Link, useMatch } from "react-router";
import css from "./Header.module.css";
import Container from "@/shared/ui/container/Container";
// import { useUser } from "@/shared/hooks/use-user";
import { UserBar } from "@/shared/components/layout/user-bar/UserBar";
import { AuthBar } from "@/shared/components/layout/auth-bar/AuthBar";
// import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import clsx from "clsx";




export default function Header() {
    const homePath = useMatch("/");
    const isHome = !!homePath;

    const isLoggedIn = false
    // const { isLoggedIn, isLoading } = useUser();
    // const breakpoint = useBreakpoint();
    // const isMobile = ["mobile", "small-mobile"].includes(breakpoint);

    return (
        <>
            <header className={css.header}>
                <Container className={clsx(css.container, isHome && css.homeContainer)}>
                    <Link
                    className={clsx(css.logo, isHome && css.whiteLogo)}
                    to="/"
                    aria-label="Logo Record"
                    >
                        Record
                    </Link>
                    <div className={css.profileContainer}>
                        {isLoggedIn ? <UserBar /> : <AuthBar />}
                    </div>
                </Container>
            </header>
        </>
    )
}