import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../static/css/cliente.css";

interface OrdenProps {
  restNombre: string;
  restDir: string;
  restTel: string;
  restCorreo: string;
  restComent: string;
}

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export function Orden({
  restNombre = "",
  restDir = "",
  restTel = "",
  restCorreo = "",
  restComent = "",
}: OrdenProps) {
  const Button = ({
    text = "unknown",
    onClick,
  }: {
    text: string;
    onClick: () => void;
  }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/middlend/menu");
        if (!response.ok) {
          setError("Error en la respuesta de la API");
          throw new Error("Error en la respuesta de la API");
        }

        const data = await response.json();
        console.log("Respuesta de la API:", data);

        if (Array.isArray(data)) {
          setMenuItems(data);
        } else {
          setError("La respuesta no es un array");
        }
      } catch (error) {
        console.error("Error al cargar el menú:", error);
        setError("No se pudo cargar el menú.");
      }
    };

    fetchMenu();
  }, []);

  const handlePlaceOrder = async () => {
    const orderData = cart.map((entry) => ({
      itemId: entry.item.id,
      itemName: entry.item.nombre,
      itemPrice: entry.item.precio,
      quantity: entry.quantity,
    }));

    console.log("Order data being sent:", orderData);

    try {
      const response = await fetch("http://127.0.0.1:5001/middlend/pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Pedido realizado con éxito");
      } else {
        alert("Error al realizar el pedido");
      }
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      alert("Hubo un error con la conexión");
    }
  };

  const openModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = async () => {
    if (selectedItem) {
      const newCart = [...cart, { item: selectedItem, quantity }];
      setCart(newCart);
      alert("Producto agregado al carrito.");

      const orderData = {
        items: newCart.map((entry) => ({
          itemId: entry.item.id,
          quantity: entry.quantity,
        })),
        total: newCart.reduce(
          (total, entry) => total + entry.item.precio * entry.quantity,
          0
        ),
      };

      console.log("Order data being sent:", orderData);

      try {
        const response = await fetch("http://127.0.0.1:5001/middlend/pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          alert("Pedido guardado en el servidor");
        } else {
          alert("Error al guardar el pedido");
        }
      } catch (error) {
        console.error("Error al realizar el pedido:", error);
        alert("Hubo un error con la conexión");
      }

      closeModal();
    }
  };

  return (
    <>
      <header className="header-orden">
        <nav className="header-orden__nav">
          <ul className="header-orden__nav__links">
            <li className="header-orden__nav__links__item">
              <Link to="/">Home</Link>
            </li>
            <li className="header-orden__nav__links__item">
              <Link to="/orden">Ordená ahora</Link>
            </li>
          </ul>
          {error && <div className="error">{error}</div>}
        </nav>
      </header>

      <main className="contenedor-orden">
        <section className="contenedor-orden__descripcion">
          <h2>{restNombre}</h2>
        </section>
        <section>
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id} className="menu-list__item">
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
                <span className="menu-precio">$ {item.precio}</span>
                <Button text="Agregar" onClick={() => openModal(item)} />{" "}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <ul className="cart-list">
            {cart.map((entry, index) => (
              <li key={index} className="cart-item">
                <span>{entry.item.nombre}</span>
                <span>
                  {entry.quantity} x ${entry.item.precio}
                </span>
              </li>
            ))}
          </ul>
          <Button text="Realizar pedido" onClick={handlePlaceOrder} />
        </section>

        <section className="contenedor-home__info">
          <h2>{restNombre}</h2>
          <p>{restComent}</p>
          <ul>
            <li>Estamos abiertos: Lunes a Viernes 8am - 16pm</li>
            <li>{restDir}</li>
          </ul>
          <ul>
            <li>{restTel}</li>
            <li>{restCorreo}</li>
          </ul>
        </section>
      </main>

      {isModalOpen && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedItem.nombre}</h3>
            <p>{selectedItem.descripcion}</p>
            <span className="menu-precio">$ {selectedItem.precio}</span>
            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <div>
              <Button text="Comprar" onClick={handleAddToCart} />
              <Button text="Cancelar" onClick={closeModal} />
            </div>
          </div>
        </div>
      )}

      <footer className="footer-orden">
        <p>&copy; 2024 {restNombre}. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
