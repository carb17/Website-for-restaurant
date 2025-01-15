import Galeria1 from "../static/img/hamburguesa.webp";
import Galeria2 from "../static/img/macchiato.webp";
import Galeria3 from "../static/img/patitas.webp";
import Galeria4 from "../static/img/tacos.webp";
import Galeria5 from "../static/img/torre-hamburguesas.avif";
import "../static/css/galeria.css";

export function Galeria() {
  return (
    <div className="galeria">
      <div className="img">
        <img src={Galeria1} alt="Hamburguesa" />
      </div>
      <div className="img">
        <img src={Galeria2} alt="Macchiato" />
      </div>
      <div className="img">
        <img src={Galeria3} alt="Patitas" />
      </div>
      <div className="img">
        <img src={Galeria4} alt="Tacos" />
      </div>
    </div>
  );
}

export function Descripción() {
  return (
    <div className="descripcion">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis magni ab
        dolor iure qui expedita officia, corporis nulla adipisci vitae?
        Perspiciatis reiciendis repellendus animi a! Rem sed ex sunt fugit!
      </p>
      <img src={Galeria5} alt="Torre de hamburguesa" />
    </div>
  );
}
