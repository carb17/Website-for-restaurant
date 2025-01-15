import { Routes, Route } from "react-router-dom";
import { Local } from "../componentes/restaurante/local";
export function Restaurante() {
  return (
    <Routes>
      <Route path="/local" element={<Local />} />
    </Routes>
  );
}
