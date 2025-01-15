import { Routes, Route } from "react-router-dom";
import { Home } from "../componentes/cliente/home";
import { Orden } from "../componentes/cliente/pedido";

export function Cliente() {
  const restNombre = "Nombre del restaurante";
  const restCorreo = "correo@gmail.com";
  const restComent = "Comentarios adicionales";
  const restDir = "Dirección del restaurante";
  const restTel = "Teléfono del restaurante";

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            restNombre={restNombre}
            restCorreo={restCorreo}
            restComent={restComent}
            restDir={restDir}
            restTel={restTel}
          />
        }
      />
      <Route
        path="/orden"
        element={
          <Orden
            restNombre={restNombre}
            restCorreo={restCorreo}
            restDir={restDir}
            restTel={restTel}
            restComent={restComent}
          />
        }
      />
    </Routes>
  );
}
