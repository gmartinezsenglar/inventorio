import React from "react";
import "./Alertas.css"; // Nuevo css que agregamos

function Alerts() {
  const alerts = [
    { message: "El producto Papas está", status: "CORTO", color: "red" },
    {
      message: "El producto Cerveza Corona está con",
      status: "mucha demanda",
      color: "green",
    },
    {
      message: "El producto Vino Tinto está",
      status: "sin demanda",
      color: "yellow",
    },
  ];

  return (
    <div className="alerts-container">
      {alerts.map((alert, index) => (
        <div key={index} className="alert-box">
          <p>
            {alert.message}{" "}
            <span className={`status ${alert.color}`}>{alert.status}</span>!
          </p>
        </div>
      ))}
    </div>
  );
}

export default Alerts;
