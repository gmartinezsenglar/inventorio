import React, { useState } from "react";
import "./InventarioGestion.css"; // crearemos esta hoja de estilos

function InventarioGestion() {
  const [productName, setProductName] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const [price, setPrice] = useState("");

  const [updateId, setUpdateId] = useState("");
  const [newStock, setNewStock] = useState("");

  const handleAddProduct = () => {
    alert(
      `Producto "${productName}" agregado con stock de ${initialStock} unidades a $${price}.`
    );
  };

  const handleUpdateStock = () => {
    alert(
      `Stock del producto ID "${updateId}" actualizado a ${newStock} unidades.`
    );
  };

  return (
    <div className="inventory-container">
      <h1>Administrar Inventario</h1>

      <section className="form-section">
        <h2>Agregar Producto</h2>
        <label>Nombre del producto:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nombre"
        />

        <label>Stock inicial:</label>
        <input
          type="number"
          value={initialStock}
          onChange={(e) => setInitialStock(e.target.value)}
          placeholder="Cantidad"
        />

        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Precio"
        />

        <button onClick={handleAddProduct}>Agregar producto</button>
      </section>

      <section className="form-section">
        <h2>Actualizar stock de producto</h2>
        <label>ID de producto a actualizar:</label>
        <input
          type="text"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
          placeholder="ID de producto"
        />

        <label>Nuevo stock de producto:</label>
        <input
          type="number"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="Nuevo stock"
        />

        <button onClick={handleUpdateStock}>Actualizar stock</button>
      </section>
    </div>
  );
}

export default InventarioGestion;
