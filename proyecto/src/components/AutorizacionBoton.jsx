import React from "react";
import "./AutorizacionBoton.css";

function AuthorizationButtons({ onAccept, onReject }) {
  return (
    <div className="auth-buttons">
      <button className="accept-btn" onClick={onAccept}>
        Aceptar
      </button>
      <button className="reject-btn" onClick={onReject}>
        Rechazar
      </button>
    </div>
  );
}

export default AuthorizationButtons;
