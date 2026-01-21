import { Suspense } from "react";
import css from "./SharedLayout.module.css";
import Header from "@/shared/components/layout/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/shared/components/layout/footer/Footer";
import { AuthModals } from "@/modules/auth/components/auth-modals";
import { BottomNav } from "@/shared/components/layout/bottom-nav/BottomNav";
import { useUser } from "@/shared/hooks/use-user";

export const SharedLayout = () => {
  const { isLoggedIn } = useUser();
  return (
    <>
      <div className={css.container}>
        <Header />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
          {isLoggedIn ? <BottomNav /> : <Footer />}
        </main>
      </div>

      <AuthModals />
    </>
  );
};
