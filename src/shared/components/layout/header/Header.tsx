import { Link, useMatch } from "react-router";
import css from "./Header.module.css";
import Container from "@/shared/ui/container/Container";
import { UserBar } from "@/shared/components/layout/user-bar/UserBar";
import { AuthBar } from "@/shared/components/layout/auth-bar/AuthBar";
import clsx from "clsx";
import { useUser } from "@/shared/hooks/use-user";

export default function Header() {
  const homePath = useMatch("/");
  const isHome = !!homePath;

  const { isLoggedIn } = useUser();

  return (
      <header className={css.header}>
        <Container className={clsx(css.container, isHome && css.homeContainer)}>
          <Link
            className={clsx(css.logo, isHome && !isLoggedIn && css.whiteLogo)}
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
    
  );
}
