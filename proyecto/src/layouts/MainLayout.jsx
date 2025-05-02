import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#d3d3d3",
      }}
    >
      <Sidebar />
      <main style={{ padding: "2rem", flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
