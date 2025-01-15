import { useState, useEffect } from "react";
import "../../static/css/local.css";

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export function Local() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [nuevoMenu, setNuevoMenu] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const Button = ({ text = "unknown" }) => {
    return <button>{text}</button>;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const direccion = await fetch("http://127.0.0.1:5001/middlend/menu");
        if (!direccion.ok) {
          setError("Error en la respuesta de la API");
          throw new Error("Error en la respuesta de la API");
        }
        const data = await direccion.json();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const agregarMenu = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, descripcion, precio } = nuevoMenu;

    if (!nombre || !descripcion || !precio) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/middlend/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: parseFloat(precio),
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el menú.");
      }

      const nuevoItem = await response.json();
      setMenuItems((prevItems) => [...prevItems, nuevoItem]);
      setNuevoMenu({ nombre: "", descripcion: "", precio: "" });
      alert("Menú agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar el menú:", error);
      setError("No se pudo agregar el menú.");
    }
  };

  return (
    <main className="contenedor-restaurante">
      <section>
        <h3>Agregar nuevo menú</h3>
        <form onSubmit={agregarMenu} className="form-nuevo-menu">
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={nuevoMenu.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="descripcion"
              value={nuevoMenu.descripcion}
              onChange={handleChange}
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={nuevoMenu.precio}
              onChange={handleChange}
              step="0.01"
            />
          </label>
          <Button text="Agregar menú" />
        </form>
      </section>

      <section>
        <h2>Menú Actual</h2>
        <ul className="menu-list-local">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-list-local__item">
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <span className="menu-precio">$ {item.precio.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
