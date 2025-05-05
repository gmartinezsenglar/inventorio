"use client";
import { FaBars, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import logo from "../../assets/logo-removebg-preview.png";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={toggleSidebar}
          aria-label="Menú"
        >
          <FaBars />
        </button>
        {/* <div className="logo-container">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="logo" />
        </div> */}
      </div>

      <div className="header-right">
        <div className="user-info">
          <span className="username">{currentUser?.name || "Usuario"}</span>
          <span className="role-badge">
            {currentUser?.role === "admin" ? "Admin" : "Empleado"}
          </span>
        </div>

        <div className="header-actions">
          <button
            className="header-button"
            onClick={handleProfileClick}
            title="Perfil"
          >
            <FaUser />
          </button>
          <button
            className="header-button logout-button"
            onClick={logout}
            title="Cerrar sesión"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
