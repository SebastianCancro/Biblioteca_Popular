import React, { useState } from "react";
import "./InfoNosotros.css";
const InfoNosotros = () => {
  const [index, setIndex] = useState(0);

  const cards = [
    {
      title: "📖 El Origen de las Bibliotecas Populares",
      content: (
        <p>
          Las <strong>bibliotecas populares argentinas</strong> nacieron durante la presidencia de <strong>Domingo Faustino Sarmiento</strong>, con la sanción de la <strong>Ley 419</strong> el <strong>23 de septiembre de 1870</strong>, hoy conocida como <strong>Ley 23.351</strong>.  
          Esta norma dio origen a la <strong>Comisión Nacional Protectora de Bibliotecas Populares (CONABIP)</strong> y sentó las bases del movimiento bibliotecario argentino.  
          Su objetivo fue acercar el conocimiento, la educación y la lectura a cada comunidad del país.  
          En ese espíritu nació la <strong>Biblioteca Popular “Dr. Antonio Novaro”</strong> en la ciudad de Chivilcoy, con el deseo de ser un faro cultural, educativo y social para todos.
        </p>
      ),
      img: "/public/images/Biblioteca-Popular.jpg",
    },
    {
      title: "📜 Fundación y Primeros Años",
      content: (
        <p>
          La <strong>Biblioteca Popular de Chivilcoy “Dr. Antonio Novaro”</strong> fue fundada el <strong>14 de julio de 1895</strong> gracias al impulso del <strong>Dr. Antonio Novaro</strong> y un grupo de vecinos comprometidos con la cultura y la educación.  
          Entre los fundadores se encontraban <strong>Sebastián Barrancos, Juan M. Díaz, Alejandro Guerz, Irineo Moras</strong> y <strong>Martín Mindurry</strong>.  
          En 1894 habían decidido refundar la biblioteca creada por <strong>Juana Manso</strong> en 1866, cerrada años antes.  
          La nueva institución abrió con <strong>2.500 libros donados</strong> por la comunidad, símbolo de la solidaridad y del compromiso colectivo.  
          Desde entonces, se consolidó como un punto de encuentro entre generaciones, docentes y estudiantes, uniendo tradición y conocimiento.
        </p>
      ),
      img: "/public/images/Fundacion.jpg",
    },
    {
      title: "🏠 El Edificio y Modernización",
      content: (
        <p>
          A comienzos del siglo XX, la biblioteca comenzó a expandirse y consolidar su presencia cultural.  
          En 1903 se adquirió un terreno en calle Frías 16, donde se construyó su primer edificio, inaugurado el 27 de julio de 1906.  
          Con el crecimiento del acervo y las actividades, el espacio pronto resultó insuficiente.  
          En un gesto histórico, el Sr. Luis Martelletti y su esposa Raquel Cores donaron un terreno en Moreno 30, donde se levantó la sede definitiva.  
          El 1° de febrero de 1979 se inauguró el actual edificio, con más de 1.700 m², amplias salas de lectura, aulas, auditorio y sectores de exposición.  
          En 2005 la institución incorporó el sistema Pérgamo, digitalizando la gestión bibliotecaria y ampliando sus servicios con computadoras y acceso a Internet.  
          Hoy, la biblioteca combina tradición, historia y tecnología, manteniendo viva su misión de ofrecer acceso libre al conocimiento.
        </p>
      ),
      img: "/public/images/Modernizacion.jpg",
    },
    {
      title: "🎨 Cultura Viva, Espacios y Compromiso",
      content: (
        <p>
          A lo largo de su historia, la <strong>Biblioteca Popular “Dr. Antonio Novaro”</strong> se transformó en un verdadero <strong>centro cultural comunitario</strong>.  
          Ha sido sede de talleres literarios, ferias del libro, charlas educativas, exposiciones artísticas y conciertos abiertos a todo el público.  
          Por sus salas pasaron destacadas personalidades como <strong>Jorge Luis Borges, Félix Luna, León Benarós, Ángel Battistessa</strong> y <strong>Benito Quinquela Martín</strong>.  
          En 2008 se creó el Rincón de Lectura junto a la Fundación Leer, en 2011 la Sala Infantil-Juvenil, y en 2018 la Sala de Colecciones, que conserva material histórico invaluable.  
          Estas áreas fomentan la lectura desde la infancia, fortalecen la inclusión educativa y preservan la memoria cultural de Chivilcoy.  
          Desde 1895, continúa siendo sinónimo de cultura, educación, encuentro y compromiso social.
        </p>
      ),
      img: "/public/images/Espacio-Cultura.jpg",
    },
    {
      title: "📩 Contacto",
      content: (
        <>
          <p>
            <strong>Dirección:</strong>{" "}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Moreno+30+Chivilcoy+Buenos+Aires"
              target="_blank"
              rel="noopener noreferrer"
            >
              Moreno 30, Chivilcoy, Buenos Aires
            </a><br />

            <strong>Teléfono:</strong>{" "}
            <a href="tel:+542346432493">(2346) 432493</a><br />

            <strong>Email:</strong>{" "}
            <a
              href="mailto:bibliotecanovarro@hotmail.com"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=bibliotecanovarro@hotmail.com&su=Consulta%20desde%20la%20web%20de%20la%20Biblioteca",
                  "_blank"
                );
              }}
            >
              bibliotecanovarro@hotmail.com
            </a><br />

            <strong>Reclamos:</strong>{" "}
            <a
              href="mailto:bibliotecanovarro@hotmail.com"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=bibliotecanovarro@hotmail.com&su=Reclamo%20desde%20la%20web",
                  "_blank"
                );
              }}
            >
              bibliotecanovarro@hotmail.com
            </a><br />

            <strong>Redes sociales:</strong>{" "}
            <a
              href="https://www.instagram.com/bibliotecanovaroantonio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            |{" "}
            <a
              href="https://www.facebook.com/100064143998729"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </p>
          <p>
            <strong>
              Acercate a conocernos, asociate o participá de nuestras actividades culturales.  
              La Biblioteca Popular “Dr. Antonio Novaro” está abierta a toda la comunidad, ofreciendo un espacio de encuentro, lectura y aprendizaje permanente.
            </strong>
          </p>
        </>
      ),
      img: "/public/images/Contacto.jpg",
    },
  ];

  const nextCard = () => setIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

return (
    <div className="info-page">
      <section className="info-section">
        <h1 key={index}>{cards[index].title}</h1>

        {cards[index].content}
        {cards[index].img && <img src={cards[index].img} alt={cards[index].title} />}
      </section>

      <button className="arrow-btn left" onClick={prevCard}>⮜</button>
      <button className="arrow-btn right" onClick={nextCard}>⮞</button>
    </div>
  );
};

export default InfoNosotros;