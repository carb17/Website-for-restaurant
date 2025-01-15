import { Link } from "react-router-dom";
import "../../static/css/cliente.css";
import { Descripción, Galeria } from "../../Galeria/galeria";

interface HomeProps {
  restNombre: string;
  restComent: string;
  restTel: string;
  restDir: string;
  restCorreo: string;
}

export function Home({
  restNombre = "",
  restComent = "",
  restTel = "",
  restDir = "",
  restCorreo = "",
}: HomeProps) {
  const Button = ({ text = "unknown" }) => {
    return (
      <button>
        <Link to="/orden" className="button-link">
          {text}
        </Link>
      </button>
    );
  };

  return (
    <>
      <header className="header-home">
        <nav className="header-home__nav">
          <ul className="header-home__nav__links">
            <li className="header-home__nav__links__item">
              <Link to="/">Home</Link>
            </li>
            <li className="header-home__nav__links__item">
              <Link to="/orden">Ordená ahora</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="contenedor-home">
        <section className="contenedor-home__descripcion">
          <h2>{restNombre}</h2>
        </section>

        <section className="contenedor-home__propaganda">
          <h4>GANA TIEMPO. COMÉ SANO.</h4>
          <h4>
            ABIERTO DE LUNES A VIERNES PARA LLEVAR Y ENTREGAR A DOMICILIO.
          </h4>
        </section>

        <section>
          <Descripción />
        </section>

        <section className="galeria">
          <Galeria />
        </section>

        <section className="contenedor-home__pedido">
          <h2>Hambriento?</h2>
          <p>{restComent}</p>
          <Button text="Pedido online" />
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

      <footer className="footer-home">
        <p>&copy; 2024 {restNombre}. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
