import { useAuth } from "../context/useAuth";
import { hasPermission } from "../auth/permissions";

export default function Can({ permission, children }) {
  const { user } = useAuth();

  if (!hasPermission(user, permission)) return null;

  return children;
}
