import { useUser } from "@/shared/hooks/use-user";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";


export interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const PrivateRoute = ({ redirectTo = "/", children }: PrivateRouteProps) => {
    const {user, isLoading} = useUser()

    if (isLoading) return null;

    return user ? <>{children}</> : <Navigate to={redirectTo} />;
}