"use client";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute() {
  const { isAuthenticated } = useAuth();

  // Si el usuario está autenticado, redirigir a la página principal
  if (isAuthenticated()) {
    return <Navigate to="/inventario" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
