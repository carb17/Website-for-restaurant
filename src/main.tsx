import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cliente } from "./paginas/cliente";
import { Cocina } from "./paginas/cocina";
import { Restaurante } from "./paginas/restaurante";
import "./static/css/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Cliente />} />
        <Route path="/cocina/*" element={<Cocina />} />
        <Route path="/restaurante/*" element={<Restaurante />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
