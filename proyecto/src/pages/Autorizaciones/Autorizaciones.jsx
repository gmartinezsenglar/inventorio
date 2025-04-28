import React from "react";
import AuthorizationButtons from "../../components/AutorizacionBoton";

function Authorizations() {
  const handleAccept = () => {
    console.log("Solicitud aceptada");
  };

  const handleReject = () => {
    console.log("Solicitud rechazada");
  };

  return (
    <div>
      <h1>Autorizaciones</h1>

      <div
        style={{
          marginTop: "2rem",
          backgroundColor: "#333",
          padding: "1rem",
          borderRadius: "8px",
          color: "#eee",
        }}
      >
        <p>
          El empleado <em>homero_chino</em> quiere actualizar el stock del
          producto <em>Manzanas</em> de <em>25</em> a <em>40</em>.
        </p>
        <AuthorizationButtons onAccept={handleAccept} onReject={handleReject} />
      </div>

      <div
        style={{
          marginTop: "2rem",
          backgroundColor: "#333",
          padding: "1rem",
          borderRadius: "8px",
          color: "#eee",
        }}
      >
        <p>
          El empleado <em>lisa_simpson</em> quiere actualizar el stock del
          producto <em>Cerveza Corona</em> de <em>12</em> a <em>20</em>.
        </p>
        <AuthorizationButtons onAccept={handleAccept} onReject={handleReject} />
      </div>
    </div>
  );
}

export default Authorizations;
