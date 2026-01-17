import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { roleRedirect } from "../../utils/roleRedirect";

export const ProtectedRoute = ({ children, roles }: any) => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role))
    return <Navigate to={roleRedirect(user.role)} />;

  return children;
};
