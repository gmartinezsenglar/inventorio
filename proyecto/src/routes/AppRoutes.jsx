import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Inventario from "../pages/Inventario/Inventario";
import InventarioGestion from "../pages/InventarioGestion/InventarioGestion";
import Autorizaciones from "../pages/Autorizaciones/Autorizaciones";
import Alertas from "../pages/Alertas/Alertas";
import AI from "../pages/AI/AI";
import Perfil from "../pages/Perfil/Perfil";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inventario" replace />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/inventariogestion" element={<InventarioGestion />} />
      <Route path="/autorizaciones" element={<Autorizaciones />} />
      <Route path="/alertas" element={<Alertas />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="*" element={<Navigate to="/inventario" replace />} />
    </Routes>
  );
}

export default AppRoutes;
