import React from "react";

function Inventario() {
  return (
    <div>
      <h1>Inventario</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>{/* Filas simuladas */}</tbody>
      </table>
    </div>
  );
}

export default Inventario;
