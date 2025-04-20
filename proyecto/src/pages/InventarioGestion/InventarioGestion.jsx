import React from "react";

function InventarioGestion() {
  return (
    <div>
      <h1>Administrar inventario</h1>
      <section>
        <h2>Agregar Producto</h2>
        <p>
          <strong>Nombre</strong> del producto:
        </p>
        <input type="text" />
        <p>Stock inicial:</p>
        <input type="number" />
        <p>Precio:</p>
        <input type="number" />
        <button>Agregar producto</button>
      </section>
      <section>
        <h2>Actualizar stock de producto</h2>
        <p>
          <strong>ID</strong> de producto a actualizar:
        </p>
        <input type="text" />
        <p>
          <strong>Nuevo stock</strong> de producto:
        </p>
        <input type="number" />
        <button>Actualizar</button>
      </section>
    </div>
  );
}

export default InventarioGestion;
