"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Por favor ingrese usuario y contraseña");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(username, password);

      if (result.success) {
        navigate("/inventario");
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error en el servidor. Intente nuevamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <div className="login-logo">InventoRio</div>
      </div>

      <div className="login-form-container">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>

        {/* <div className="login-info">
          <p>Credenciales de prueba:</p>
          <p>
            <strong>Admin:</strong> usuario: admin, contraseña: admin
          </p>
          <p>
            <strong>Empleado:</strong> usuario: empleado, contraseña: empleado
          </p>
        </div> */}
      </div>

      <footer className="login-footer">
        <p>Todos los derechos reservados. © 2025.</p>
        <p>
          <i>Si necesita asistencia, contacta al correo: inventorio@uct.cl</i>
        </p>
      </footer>
    </div>
  );
}

export default Login;
