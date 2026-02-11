// InfoNosotros.jsx
import React from "react";
import "./InfoNosotros.css";

const InfoNosotros = () => {
  return (
    <div className="info-page">
      <section className="info-section">
        <h1>📚 Sobre Nosotros</h1>
        <p>
          La Biblioteca Popular de Chivilcoy “Dr. Antonio Novaro” fue fundada en 1950 con el objetivo de fomentar la lectura y la cultura en la comunidad.  
          Es un espacio de encuentro, aprendizaje y acceso a la información para todas las edades, con talleres, actividades culturales y salas de lectura abiertas a la comunidad.
        </p>
      </section>
      <section className="info-section">
        <h2>📖 Nuestra Historia</h2>
        <p>
          Comenzamos con una pequeña colección de 500 libros donados por vecinos.  
          Hoy contamos con más de 20,000 ejemplares, salas de lectura, talleres de lectura y escritura, cursos y actividades culturales para toda la familia.
        </p>
      </section>
      <section className="info-section">
        <h2>💛 Donaciones</h2>
        <p>
          La Biblioteca depende del apoyo de la comunidad. Puedes colaborar con libros, material educativo o donaciones económicas.  
          Cada aporte nos ayuda a mantener las salas, ampliar nuestra colección y realizar actividades culturales.  
          Contacto para donaciones: <a href="mailto:donaciones@bibliotecachivilcoy.com">donaciones@bibliotecachivilcoy.com</a> o <a href="tel:+542346432493">llamando al (2346) 432493</a>.
        </p>
      </section>
      <section className="info-section">
        <h2>📩 Contacto</h2>
        <p><strong>Dirección:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Moreno+30+Chivilcoy+Buenos+Aires" target="_blank" rel="noopener noreferrer">Moreno 30, Chivilcoy, Buenos Aires</a></p>
        <p><strong>Teléfono:</strong> <a href="tel:+542346432493">(2346) 432493</a></p>
        <p><strong>Email: </strong><a href="mailto:contacto@bibliotecachivilcoy.com"> contacto@bibliotecachivilcoy.com</a></p>
        <p><strong>Mail de reclamos: </strong><a href="mailto:reclamos@bibliotecachivilcoy.com"> reclamos@bibliotecachivilcoy.com</a></p>
        <p><strong>Redes sociales: </strong>
          <a href="https://www.instagram.com/bibliotecachivilcoy" target="_blank" rel="noopener noreferrer">Instagram</a> | 
          <a href="https://www.facebook.com/bibliotecachivilcoy" target="_blank" rel="noopener noreferrer">Facebook</a>
        </p>
      </section>
 </div>
  );
};

export default InfoNosotros;
