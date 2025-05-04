"use client";
import { FaBars } from "react-icons/fa";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-removebg-preview.png";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
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
          <img src={logo} alt="Logo" className="logo" />
        </div> */}
      </div>
      <div
        className="profile"
        onClick={() => navigate("/perfil")}
        role="button"
        aria-label="Perfil"
      >
        <img src={require("../../assets/profile.png")} alt="Perfil" />
      </div>
    </header>
  );
}

export default Header;
