import { useUser } from "@/shared/hooks/use-user";
import Loader from "@/shared/ui/loader/Loader";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const PrivateRoute = ({
  redirectTo = "/",
  children,
}: PrivateRouteProps) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return <Loader />;

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
