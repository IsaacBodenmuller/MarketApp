import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { hasPermission } from "../auth/permissions";

export default function ProtectedRoute({ children, permission }) {
  const { accessToken, user } = useAuth();

  if (!accessToken || !user) return <Navigate to="/login" replace />;

  if (permission && !hasPermission(user, permission)) {
    return <Navigate to="/home/dashboard" />;
  }

  return children;
}
