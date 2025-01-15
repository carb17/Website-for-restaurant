import "../../static/css/comanda.css";

interface ComandaProps {
  restNombre: string;
  nombreCliente: string;
  menu: string;
}

export function Comanda({
  restNombre = "",
  nombreCliente = "",
  menu = "",
}: ComandaProps) {
  return (
    <>
      <div className="fondo-comanda">
        <div className="item-comanda">
          <span>{restNombre}</span>
          <span>Pedido de: {nombreCliente}</span>
          <span>Orden: {menu}</span>
        </div>
      </div>
    </>
  );
}
