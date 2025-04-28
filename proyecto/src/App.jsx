import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Detectamos si estamos en login

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#d3d3d3",
        minHeight: "100vh",
      }}
    >
      {!isLoginPage && <Sidebar />} {/* Sidebar sólo si NO es login */}
      <main style={{ padding: isLoginPage ? 0 : "2rem", flexGrow: 1 }}>
        <AppRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
