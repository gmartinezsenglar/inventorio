import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Inventario from "../pages/Inventario/Inventario";
import InventarioGestion from "../pages/InventarioGestion/InventarioGestion";
import Autorizaciones from "../pages/Autorizaciones/Autorizaciones";
import Alertas from "../pages/Alertas/Alertas";
import AI from "../pages/AI/AI";
import Perfil from "../pages/Perfil/Perfil";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import LoginLayout from "../layouts/LoginLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Login Layout */}
      <Route element={<LoginLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      {/* Main App Layout (requiere login) */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/inventariogestion" element={<InventarioGestion />} />
        <Route path="/autorizaciones" element={<Autorizaciones />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
