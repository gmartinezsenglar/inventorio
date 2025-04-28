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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* rutas protegidas */}
      <Route
        path="/inventario"
        element={
          <PrivateRoute>
            <Inventario />
          </PrivateRoute>
        }
      />
      <Route
        path="/inventariogestion"
        element={
          <PrivateRoute>
            <InventarioGestion />
          </PrivateRoute>
        }
      />
      <Route
        path="/autorizaciones"
        element={
          <PrivateRoute>
            <Autorizaciones />
          </PrivateRoute>
        }
      />
      <Route
        path="/alertas"
        element={
          <PrivateRoute>
            <Alertas />
          </PrivateRoute>
        }
      />
      <Route
        path="/ai"
        element={
          <PrivateRoute>
            <AI />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
