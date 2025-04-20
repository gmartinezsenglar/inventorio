import React from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ padding: "1rem", flexGrow: 1 }}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
