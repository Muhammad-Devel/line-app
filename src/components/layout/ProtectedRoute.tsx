import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { roleRedirect } from "../../utils/roleRedirect";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" replace />;

  if (roles && user?.role && !roles.includes(user.role)) {
    return <Navigate to={roleRedirect(user.role)} replace />;
  }

  if (roles && !user?.role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
