import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
