"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../../utils/localStorage";
import "./Inventario.css";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar productos desde localStorage
    const loadProducts = () => {
      const storedProducts = getProducts();
      setProducts(storedProducts);
      setLoading(false);
    };

    loadProducts();

    // Escuchar cambios en localStorage para actualizar la tabla
    const handleStorageChange = () => {
      loadProducts();
    };

    window.addEventListener("storage", handleStorageChange);

    // Configurar un intervalo para verificar cambios en localStorage
    // (útil cuando los cambios ocurren en la misma pestaña)
    const interval = setInterval(loadProducts, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">Cargando inventario...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos en el inventario.</p>
          <p>Para agregar productos, dirígete a "Administrar inv."</p>
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
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td className={product.stock <= 5 ? "low-stock" : ""}>
                    {product.stock}
                  </td>
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
