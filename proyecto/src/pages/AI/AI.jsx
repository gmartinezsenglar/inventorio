import React, { useState } from "react";
import "./AI.css"; // también nuevo

function AI() {
  const [selectedReport, setSelectedReport] = useState("stock");
  const [productId, setProductId] = useState("");

  const handleGeneratePDF = () => {
    alert(
      `Generando PDF de ${
        selectedReport === "stock" ? "Stock" : "Predicción de demanda"
      } para producto ID: ${productId}`
    );
  };

  return (
    <div className="ai-container">
      <div className="button-group">
        <button
          className={selectedReport === "stock" ? "active" : ""}
          onClick={() => setSelectedReport("stock")}
        >
          Stock
        </button>
        <button
          className={selectedReport === "demand" ? "active" : ""}
          onClick={() => setSelectedReport("demand")}
        >
          Predicción de Demanda
        </button>
      </div>

      <div className="input-group">
        <label>ID de Producto</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Ingrese ID de producto"
        />
      </div>

      <button className="generate-btn" onClick={handleGeneratePDF}>
        Generar PDF
      </button>
    </div>
  );
}

export default AI;
