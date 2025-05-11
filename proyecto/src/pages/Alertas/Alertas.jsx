"use client";

import { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import "./Alertas.css";

function Alerts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar productos desde Supabase
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError(
          "Error al cargar los productos. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Configurar un intervalo para actualizar los datos periódicamente
    const interval = setInterval(loadProducts, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  // Función para determinar el estado del stock de un producto
  const getStockStatus = (product) => {
    const { stock_act, stock_min } = product;

    if (stock_act <= stock_min) {
      return {
        message: "está CORTO",
        color: "red",
        icon: <AlertCircle size={20} />,
      };
    } else if (stock_act <= stock_min * 2) {
      return {
        message: "se está quedando CORTO",
        color: "yellow",
        icon: <AlertTriangle size={20} />,
      };
    } else {
      return {
        message: "tiene buen nivel",
        color: "green",
        icon: <CheckCircle size={20} />,
      };
    }
  };

  // Filtrar productos que necesitan atención
  const alertProducts = products.filter(
    (product) => product.stock_act <= product.stock_min * 2
  );

  return (
    <div className="alerts-container">
      <h1 className="page-title">Alertas del Sistema</h1>

      {error && <div className="error-alert">{error}</div>}

      {loading ? (
        <div className="loading">Cargando alertas...</div>
      ) : alertProducts.length === 0 ? (
        <div className="no-alerts">
          <CheckCircle size={40} />
          <p>¡No hay alertas de stock en este momento!</p>
          <p>Todos los productos tienen niveles de stock adecuados.</p>
        </div>
      ) : (
        <>
          <div className="alerts-summary">
            <p>
              Se encontraron {alertProducts.length} productos que requieren
              atención.
            </p>
          </div>

          {alertProducts.map((product) => {
            const status = getStockStatus(product);

            return (
              <div
                key={product.ID_prod}
                className={`alert-box ${status.color}`}
              >
                <div className="alert-icon">{status.icon}</div>
                <div className="alert-content">
                  <p>
                    El producto{" "}
                    <span className="product-name">{product.nombre}</span>{" "}
                    <span className={`status ${status.color}`}>
                      {status.message}
                    </span>{" "}
                    de stock!
                  </p>
                  <div className="alert-details">
                    <span>Stock actual: {product.stock_act}</span>
                    <span>Stock mínimo: {product.stock_min}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Alerts;
