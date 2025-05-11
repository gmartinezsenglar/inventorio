"use client";

import { useEffect, useState } from "react";
import AuthorizationButtons from "../../components/AutorizacionBoton";
import { authorizationService } from "../../services/authorizationService";
import { productService } from "../../services/productService";
import { useAuth } from "../../context/AuthContext";
import { RefreshCw } from "lucide-react";
import "./Autorizaciones.css";

function Authorizations() {
  const [authorizations, setAuthorizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { hasRole } = useAuth();
  const isAdmin = hasRole("admin");

  // Cargar autorizaciones desde Supabase
  const loadAuthorizations = async () => {
    try {
      setLoading(true);
      const data = await authorizationService.getAllAuthorizations();
      setAuthorizations(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar autorizaciones:", err);
      setError(
        "Error al cargar las autorizaciones. Por favor, intente nuevamente."
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAuthorizations();

    // Configurar un intervalo para actualizar los datos periódicamente
    const interval = setInterval(loadAuthorizations, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadAuthorizations();
  };

  const handleAccept = async (authId, productId, newStock) => {
    try {
      // Actualizar el stock del producto
      await productService.updateProductStock(productId, newStock);

      // Eliminar la autorización
      await authorizationService.deleteAuthorization(authId);

      // Actualizar la lista de autorizaciones
      setAuthorizations(
        authorizations.filter((auth) => auth.ID_auth !== authId)
      );
    } catch (error) {
      console.error("Error al aceptar autorización:", error);
      alert(
        "Error al procesar la autorización. Por favor, intente nuevamente."
      );
    }
  };

  const handleReject = async (authId) => {
    try {
      // Eliminar la autorización
      await authorizationService.deleteAuthorization(authId);

      // Actualizar la lista de autorizaciones
      setAuthorizations(
        authorizations.filter((auth) => auth.ID_auth !== authId)
      );
    } catch (error) {
      console.error("Error al rechazar autorización:", error);
      alert(
        "Error al procesar la autorización. Por favor, intente nuevamente."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1 className="page-title">Autorizaciones Pendientes</h1>
        <button
          className={`refresh-button ${isRefreshing ? "refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
          title="Refrescar datos"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      {loading && !isRefreshing ? (
        <div className="loading">Cargando autorizaciones...</div>
      ) : authorizations.length === 0 ? (
        <div className="empty-state">
          <p>No hay autorizaciones pendientes.</p>
        </div>
      ) : !isAdmin ? (
        <div className="role-notice">
          <p>Solo los administradores pueden gestionar las autorizaciones.</p>
          <p>Hay {authorizations.length} autorizaciones pendientes.</p>
        </div>
      ) : (
        authorizations.map((auth) => (
          <div key={auth.ID_auth} className="auth-card">
            <p>
              El empleado{" "}
              <span className="highlight">
                {auth.Usuarios?.nombre || auth.usuario}
              </span>{" "}
              quiere actualizar el stock del producto{" "}
              <span className="highlight">
                {auth.Productos?.nombre || `ID: ${auth.ID_prod}`}
              </span>{" "}
              de <span className="highlight">{auth.stock_inicial}</span> a{" "}
              <span className="highlight">{auth.nuevo_stock}</span>.
            </p>
            <AuthorizationButtons
              onAccept={() =>
                handleAccept(auth.ID_auth, auth.ID_prod, auth.nuevo_stock)
              }
              onReject={() => handleReject(auth.ID_auth)}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Authorizations;
