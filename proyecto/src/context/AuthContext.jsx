"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";

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

  // Función para iniciar sesión con Supabase
  const login = async (username, password) => {
    try {
      const result = await userService.login(username, password);

      if (result.success) {
        // Guardar usuario en localStorage para persistencia
        localStorage.setItem("user", JSON.stringify(result.user));
        setCurrentUser(result.user);
        return { success: true };
      } else {
        return {
          success: false,
          error: result.error || "Error al iniciar sesión",
        };
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      return {
        success: false,
        error: "Error en el servidor. Intente nuevamente.",
      };
    }
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
