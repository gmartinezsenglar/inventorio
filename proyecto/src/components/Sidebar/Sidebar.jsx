import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import userIcon from "../../assets/profile.png";

function Sidebar() {
  const links = [
    { to: "/inventario", label: "Inventario" },
    { to: "/inventariogestion", label: "Administrar inv." },
    { to: "/autorizaciones", label: "Autorizaciones" },
    { to: "/alertas", label: "Alertas" },
    { to: "/ai", label: "AI" },
  ];

  return (
    <div className="sidebar">
      <div className="top-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="bottom-profile">
        <NavLink
          to="/Perfil"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <div className="profile-link-content">
            <img src={userIcon} alt="User Icon" className="profile-img" />
            <span>Perfil</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
