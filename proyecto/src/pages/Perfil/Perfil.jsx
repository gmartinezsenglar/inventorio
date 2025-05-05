"use client";

import { useAuth } from "../../context/AuthContext";
import { FaUser, FaIdCard, FaSignOutAlt } from "react-icons/fa";
import "./Perfil.css";

function Perfil() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="profile-container">
      <h1 className="page-title">Mi Perfil</h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser size={40} />
          </div>
          <div className="profile-info">
            <h2>{currentUser?.name || "Usuario"}</h2>
            <span className="profile-role">
              {currentUser?.role === "admin" ? "Administrador" : "Empleado"}
            </span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FaIdCard />
            <div>
              <label>Nombre de usuario</label>
              <p>{currentUser?.username}</p>
            </div>
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Perfil;
