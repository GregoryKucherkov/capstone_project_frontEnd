import { useUser } from "@/shared/hooks/use-user";
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

  if (isLoading) return null;

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
