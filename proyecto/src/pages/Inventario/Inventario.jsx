"use client";

import { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import { RefreshCw, Search, X } from "lucide-react";
import "./Inventario.css";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // desc o asc

  // Cargar productos desde Supabase
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();

      // Ordenar productos por ID (descendente por defecto)
      const sortedData = sortProducts(data, sortOrder);

      setProducts(sortedData);
      setFilteredProducts(sortedData);
      setError(null);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("Error al cargar los productos. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Ordenar productos por ID
  const sortProducts = (productsToSort, order) => {
    return [...productsToSort].sort((a, b) => {
      if (order === "desc") {
        return b.ID_prod - a.ID_prod;
      } else {
        return a.ID_prod - b.ID_prod;
      }
    });
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();

    // Configurar un intervalo para actualizar los datos periódicamente
    const interval = setInterval(loadProducts, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, [sortOrder]);

  // Manejar la búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.nombre.toLowerCase().includes(term) ||
          product.categoria.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Manejar el refresco de datos
  const handleRefresh = () => {
    setIsRefreshing(true);
    loadProducts();
  };

  // Limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Cambiar el orden de clasificación
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);

    // Reordenar los productos actuales
    const reordered = sortProducts(products, newOrder);
    setProducts(reordered);
    setFilteredProducts(sortProducts(filteredProducts, newOrder));
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Inventario</h1>

      {error && <div className="error-alert">{error}</div>}

      <div className="inventory-controls">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={clearSearch}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="control-buttons">
          <button
            className="sort-button"
            onClick={toggleSortOrder}
            title={
              sortOrder === "desc"
                ? "Ordenar ascendente"
                : "Ordenar descendente"
            }
          >
            ID {sortOrder === "desc" ? "↓" : "↑"}
          </button>

          <button
            className={`refresh-button ${isRefreshing ? "refreshing" : ""}`}
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            title="Refrescar datos"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {loading && !isRefreshing ? (
        <div className="loading">Cargando inventario...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          {searchTerm ? (
            <>
              <p>
                No se encontraron productos que coincidan con "{searchTerm}"
              </p>
              <button className="clear-search-button" onClick={clearSearch}>
                Limpiar búsqueda
              </button>
            </>
          ) : (
            <>
              <p>No hay productos en el inventario.</p>
              <p>
                Puedes agregar productos desde la sección "Administrar inv."
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="inventory-table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio ($)</th>
                <th>Stock</th>
                <th>Stock Mínimo</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.ID_prod}>
                  <td>{product.ID_prod}</td>
                  <td>{product.nombre}</td>
                  <td>{product.categoria}</td>
                  <td>{product.precio}</td>
                  <td
                    className={
                      product.stock_act <= product.stock_min ? "low-stock" : ""
                    }
                  >
                    {product.stock_act}
                  </td>
                  <td>{product.stock_min}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Inventory;
