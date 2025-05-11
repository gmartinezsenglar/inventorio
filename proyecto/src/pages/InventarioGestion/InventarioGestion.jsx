"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { productService } from "../../services/productService";
import { authorizationService } from "../../services/authorizationService";
import "./InventarioGestion.css";

function InventarioGestion() {
  const { currentUser, hasRole } = useAuth();
  const isAdmin = hasRole("admin");

  // Estados para el formulario de agregar producto
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const [price, setPrice] = useState("");
  const [stockMin, setStockMin] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Estados para el formulario de actualizar stock
  const [updateId, setUpdateId] = useState("");
  const [newStock, setNewStock] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  // Manejar la adición de un nuevo producto (solo admin)
  const handleAddProduct = async () => {
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
    const stockMinNum = stockMin ? Number.parseInt(stockMin, 10) : 5; // Valor por defecto

    if (isNaN(stockNum) || stockNum < 0) {
      setAddError("El stock inicial debe ser un número no negativo");
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setAddError("El precio debe ser un número positivo");
      return;
    }

    if (isNaN(stockMinNum) || stockMinNum < 0) {
      setAddError("El stock mínimo debe ser un número no negativo");
      return;
    }

    // Agregar el producto
    try {
      setIsAddingProduct(true);

      const newProduct = await productService.addProduct({
        name: productName,
        category,
        stock: stockNum,
        price: priceNum,
        stock_min: stockMinNum,
      });

      // Mostrar mensaje de éxito
      setAddSuccess(
        `Producto "${productName}" agregado con ID: ${newProduct.ID_prod}`
      );

      // Limpiar el formulario
      setProductName("");
      setCategory("");
      setInitialStock("");
      setPrice("");
      setStockMin("");
    } catch (error) {
      setAddError("Error al agregar el producto: " + error.message);
    } finally {
      setIsAddingProduct(false);
    }
  };

  // Verificar si un producto existe y obtener sus detalles
  const checkProduct = async () => {
    if (!updateId.trim()) {
      setUpdateError("El ID del producto es obligatorio");
      setProductDetails(null);
      return false;
    }

    try {
      setIsUpdatingStock(true);
      const exists = await productService.productExists(updateId);

      if (!exists) {
        setUpdateError(`No existe un producto con ID: ${updateId}`);
        setProductDetails(null);
        return false;
      }

      // Obtener detalles del producto
      const product = await productService.getProductById(updateId);
      setProductDetails(product);
      return true;
    } catch (error) {
      setUpdateError("Error al verificar producto: " + error.message);
      setProductDetails(null);
      return false;
    } finally {
      setIsUpdatingStock(false);
    }
  };

  // Manejar la actualización del stock o solicitud de autorización
  const handleUpdateStock = async () => {
    // Resetear mensajes
    setUpdateError("");
    setUpdateSuccess("");

    // Validar ID y verificar producto
    const productValid = await checkProduct();
    if (!productValid) return;

    // Validar stock
    const stockNum = Number.parseInt(newStock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setUpdateError("El stock debe ser un número no negativo");
      return;
    }

    try {
      setIsUpdatingStock(true);

      // Si es admin, actualizar directamente
      if (isAdmin) {
        const result = await productService.updateProductStock(
          updateId,
          stockNum
        );

        if (result.success) {
          setUpdateSuccess(
            `Stock del producto ID "${updateId}" actualizado a ${stockNum} unidades`
          );
          // Limpiar el formulario
          setUpdateId("");
          setNewStock("");
          setProductDetails(null);
        } else {
          setUpdateError(result.message);
        }
      }
      // Si es empleado, crear solicitud de autorización
      else {
        const authRequest =
          await authorizationService.createAuthorizationRequest(
            currentUser.username,
            Number.parseInt(updateId),
            productDetails.stock_act,
            stockNum
          );

        setUpdateSuccess(
          `Solicitud de autorización creada para actualizar el stock del producto "${productDetails.nombre}" de ${productDetails.stock_act} a ${stockNum} unidades`
        );

        // Limpiar el formulario
        setUpdateId("");
        setNewStock("");
        setProductDetails(null);
      }
    } catch (error) {
      setUpdateError("Error: " + (error.message || "Error desconocido"));
    } finally {
      setIsUpdatingStock(false);
    }
  };

  return (
    <div className="inventory-container">
      <h1 className="page-title">Administrar Inventario</h1>

      {!isAdmin && (
        <div className="role-notice">
          <AlertCircle size={20} />
          <p>
            Como empleado, puedes solicitar cambios de stock que deberán ser
            aprobados por un administrador.
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
              disabled={isAddingProduct}
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
              disabled={isAddingProduct}
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
              disabled={isAddingProduct}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stockMin">Stock mínimo:</label>
            <input
              id="stockMin"
              type="number"
              min="0"
              value={stockMin}
              onChange={(e) => setStockMin(e.target.value)}
              placeholder="Stock mínimo (por defecto: 5)"
              disabled={isAddingProduct}
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
              disabled={isAddingProduct}
            />
          </div>

          <button
            onClick={handleAddProduct}
            className="action-button"
            disabled={isAddingProduct}
          >
            {isAddingProduct ? "Agregando..." : "Agregar producto"}
          </button>
        </section>
      )}

      {/* Sección para actualizar stock o solicitar autorización */}
      <section className="form-section">
        <h2>
          {isAdmin
            ? "Actualizar stock de producto"
            : "Solicitar cambio de stock"}
        </h2>

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
          <label htmlFor="updateId">ID de producto:</label>
          <div className="input-with-button">
            <input
              id="updateId"
              type="text"
              value={updateId}
              onChange={(e) => {
                setUpdateId(e.target.value);
                setProductDetails(null);
              }}
              placeholder="ID de producto"
              disabled={isUpdatingStock}
            />
            <button
              onClick={checkProduct}
              className="check-button"
              disabled={isUpdatingStock || !updateId.trim()}
            >
              Verificar
            </button>
          </div>
        </div>

        {productDetails && (
          <div className="product-details">
            <h3>{productDetails.nombre}</h3>
            <p>Categoría: {productDetails.categoria}</p>
            <p>Stock actual: {productDetails.stock_act}</p>
            <p>Stock mínimo: {productDetails.stock_min}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="newStock">Nuevo stock de producto:</label>
          <input
            id="newStock"
            type="number"
            min="0"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            placeholder="Nuevo stock"
            disabled={isUpdatingStock || !productDetails}
          />
        </div>

        <button
          onClick={handleUpdateStock}
          className="action-button"
          disabled={isUpdatingStock || !productDetails || !newStock}
        >
          {isUpdatingStock
            ? "Procesando..."
            : isAdmin
            ? "Actualizar stock"
            : "Solicitar cambio de stock"}
        </button>
      </section>
    </div>
  );
}

export default InventarioGestion;
