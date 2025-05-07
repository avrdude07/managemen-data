import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export default function PublicRoute({ children }) {
  const { authUser } = useAuthContext();

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
