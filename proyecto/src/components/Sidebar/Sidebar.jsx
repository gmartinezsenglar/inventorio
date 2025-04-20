import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    { to: "/inventario", label: "Inventario" },
    { to: "/inventariogestion", label: "Administrar inv." },
    { to: "/autorizaciones", label: "Autorizaciones" },
    { to: "/alertas", label: "Alertas" },
    { to: "/ai", label: "AI" },
    { to: "/perfil", label: "Perfil" },
  ];

  return (
    <nav
      style={{ width: "200px", padding: "1rem", borderRight: "1px solid #ccc" }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link) => (
          <li key={link.to} style={{ margin: "0.5rem 0" }}>
            <NavLink to={link.to} style={{ textDecoration: "none" }}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
