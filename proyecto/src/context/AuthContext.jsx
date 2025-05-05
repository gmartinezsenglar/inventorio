"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (username, password) => {
    // Credenciales para admin
    if (username === "admin" && password === "admin") {
      const user = {
        username: "admin",
        role: "admin",
        name: "Administrador",
      };
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      return { success: true };
    }

    // Credenciales para empleado
    else if (username === "empleado" && password === "empleado") {
      const user = {
        username: "empleado",
        role: "employee",
        name: "Empleado",
      };
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      return { success: true };
    }

    // Credenciales inválidas
    return {
      success: false,
      error: "Usuario o contraseña incorrectos",
    };
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return currentUser?.role === role;
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!currentUser;
  };

  const value = {
    currentUser,
    login,
    logout,
    hasRole,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
