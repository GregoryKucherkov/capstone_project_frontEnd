import { Suspense } from "react";
import css from "./SharedLayout.module.css";
import Header from "@/shared/components/layout/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/shared/components/layout/footer/Footer";
import { AuthModals } from "@/modules/auth/components/auth-modals";
import { BottomNav } from "@/shared/components/layout/bottom-nav/BottomNav";
import { useUser } from "@/shared/hooks/use-user";
import Loader from "@/shared/ui/loader/Loader";
import { Toaster } from "react-hot-toast";

export const SharedLayout = () => {
  const { isLoggedIn } = useUser();
  return (
    <div className={css.pageWrapper}>
      <Header />
      <main className={css.homeStack}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      {isLoggedIn ? <BottomNav /> : <Footer />}

      <Toaster position="top-center" reverseOrder={false} />

      <AuthModals />
    </div>
  );
};
