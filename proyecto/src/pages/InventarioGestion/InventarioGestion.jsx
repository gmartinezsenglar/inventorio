"use client";

import { useState } from "react";
import {
  addProduct,
  updateProductStock,
  productExists,
} from "../../utils/localStorage";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./InventarioGestion.css";

function InventarioGestion() {
  const { currentUser, hasRole } = useAuth();
  const isAdmin = hasRole("admin");

  // Estados para el formulario de agregar producto
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const [price, setPrice] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  // Estados para el formulario de actualizar stock
  const [updateId, setUpdateId] = useState("");
  const [newStock, setNewStock] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  // Manejar la adición de un nuevo producto
  const handleAddProduct = () => {
    // Resetear mensajes
    setAddError("");
    setAddSuccess("");

    // Validar campos requeridos
    if (!productName.trim()) {
      setAddError("El nombre del producto es obligatorio");
      return;
    }

    if (!category.trim()) {
      setAddError("La categoría es obligatoria");
      return;
    }

    // Validar stock y precio
    const stockNum = Number.parseInt(initialStock, 10);
    const priceNum = Number.parseFloat(price);

    if (isNaN(stockNum) || stockNum < 0) {
      setAddError("El stock inicial debe ser un número no negativo");
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setAddError("El precio debe ser un número positivo");
      return;
    }

    // Agregar el producto
    try {
      const newProduct = addProduct({
        name: productName,
        category,
        stock: stockNum,
        price: priceNum,
      });

      // Mostrar mensaje de éxito
      setAddSuccess(
        `Producto "${productName}" agregado con ID: ${newProduct.id}`
      );

      // Limpiar el formulario
      setProductName("");
      setCategory("");
      setInitialStock("");
      setPrice("");
    } catch (error) {
      setAddError("Error al agregar el producto: " + error.message);
    }
  };

  // Manejar la actualización del stock
  const handleUpdateStock = () => {
    // Resetear mensajes
    setUpdateError("");
    setUpdateSuccess("");

    // Validar ID
    if (!updateId.trim()) {
      setUpdateError("El ID del producto es obligatorio");
      return;
    }

    // Verificar si el producto existe
    if (!productExists(updateId)) {
      setUpdateError(`No existe un producto con ID: ${updateId}`);
      return;
    }

    // Validar stock
    const stockNum = Number.parseInt(newStock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setUpdateError("El stock debe ser un número no negativo");
      return;
    }

    // Actualizar el stock
    try {
      const result = updateProductStock(updateId, stockNum);

      if (result.success) {
        setUpdateSuccess(
          `Stock del producto ID "${updateId}" actualizado a ${stockNum} unidades`
        );

        // Limpiar el formulario
        setUpdateId("");
        setNewStock("");
      } else {
        setUpdateError(result.message);
      }
    } catch (error) {
      setUpdateError("Error al actualizar el stock: " + error.message);
    }
  };

  return (
    <div className="inventory-container">
      <h1 className="page-title">Administrar Inventario</h1>

      {!isAdmin && (
        <div className="role-notice">
          <AlertCircle size={20} />
          <p>
            Como empleado, solo puedes actualizar el stock de productos
            existentes.
          </p>
        </div>
      )}

      {/* Sección para agregar productos - solo visible para administradores */}
      {isAdmin && (
        <section className="form-section">
          <h2>Agregar Producto</h2>

          {addError && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{addError}</span>
            </div>
          )}

          {addSuccess && (
            <div className="success-message">
              <CheckCircle size={18} />
              <span>{addSuccess}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="productName">Nombre del producto:</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Categoría"
            />
          </div>

          <div className="form-group">
            <label htmlFor="initialStock">Stock inicial:</label>
            <input
              id="initialStock"
              type="number"
              min="0"
              value={initialStock}
              onChange={(e) => setInitialStock(e.target.value)}
              placeholder="Cantidad"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Precio"
            />
          </div>

          <button onClick={handleAddProduct} className="action-button">
            Agregar producto
          </button>
        </section>
      )}

      {/* Sección para actualizar stock - visible para todos los usuarios */}
      <section className="form-section">
        <h2>Actualizar stock de producto</h2>

        {updateError && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{updateError}</span>
          </div>
        )}

        {updateSuccess && (
          <div className="success-message">
            <CheckCircle size={18} />
            <span>{updateSuccess}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="updateId">ID de producto a actualizar:</label>
          <input
            id="updateId"
            type="text"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            placeholder="ID de producto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="newStock">Nuevo stock de producto:</label>
          <input
            id="newStock"
            type="number"
            min="0"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            placeholder="Nuevo stock"
          />
        </div>

        <button onClick={handleUpdateStock} className="action-button">
          Actualizar stock
        </button>
      </section>
    </div>
  );
}

export default InventarioGestion;
