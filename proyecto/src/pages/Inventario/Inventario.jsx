import React from "react";
import "./Inventario.css";

function Inventory() {
  const products = [
    {
      id: "001",
      name: "Leche Entera",
      category: "Alimentos",
      price: 1200,
      stock: 15,
    },
    {
      id: "002",
      name: "Pan de Molde",
      category: "Alimentos",
      price: 1500,
      stock: 8,
    },
    {
      id: "003",
      name: "Manzanas",
      category: "Verduras y Frutas",
      price: 900,
      stock: 25,
    },
    {
      id: "004",
      name: "Papas",
      category: "Verduras y Frutas",
      price: 800,
      stock: 5,
    },
    {
      id: "005",
      name: "Cerveza Corona",
      category: "Alcohol",
      price: 1500,
      stock: 12,
    },
    {
      id: "006",
      name: "Vino Tinto",
      category: "Alcohol",
      price: 4000,
      stock: 7,
    },
    {
      id: "007",
      name: "Marlboro Gold",
      category: "Cigarrillos",
      price: 5000,
      stock: 20,
    },
    {
      id: "008",
      name: "Coca-Cola 1.5L",
      category: "Bebidas",
      price: 2000,
      stock: 18,
    },
  ];
  return (
    <div>
      <table
        style={{
          width: "100%",
          marginTop: "2rem",
          backgroundColor: "#333",
          color: "#eee",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
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
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
