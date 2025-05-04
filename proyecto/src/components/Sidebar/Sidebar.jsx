"use client";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
  const links = [
    { to: "/inventario", label: "Inventario" },
    { to: "/inventariogestion", label: "Administrar inv." },
    { to: "/autorizaciones", label: "Autorizaciones" },
    { to: "/alertas", label: "Alertas" },
    { to: "/ai", label: "AI" },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="top-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "link active" : "link")}
              onClick={() => toggleSidebar()}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default Sidebar;
