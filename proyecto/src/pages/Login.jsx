import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // hoja de estilos nueva

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/inventory");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">InventoRio</div>

      <form className="login-box" onSubmit={handleLogin}>
        <label>Usuario</label>
        <input
          type="text"
          placeholder="Ingrese su correo/usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>

      <footer>
        <p>Todos los derechos reservados. © 2025.</p>
        <p>
          <i>Si necesita asistencia, contacta al correo: inventorio@uct.cl</i>
        </p>
      </footer>
    </div>
  );
}

export default Login;
