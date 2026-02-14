import React from "react";
import { useNavigate } from "react-router-dom";
import "./Questions.css";

const Questions = () => {
  const navigate = useNavigate();

  const handleNavigate = (path, id) => {
    navigate(path);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  const preguntas = [
    {
      pregunta: "📚 ¿Cómo me hago socio?",
      respuesta: (
        <p>
          Para ser socio de la Biblioteca Popular de Chivilcoy, solo necesitás
          presentarte con tu DNI y completar la planilla de inscripción en la
          biblioteca. La inscripción es gratuita y te permite acceder a libros,
          salas de lectura y talleres culturales.
        </p>
      ),
    },
    {
      pregunta: "🧾 ¿Cómo puedo inscribirme a un curso o taller?",
      respuesta: (
        <p>
          La inscripción a cursos y talleres se realiza completando un
          formulario disponible en la sección{" "}
          <span
            className="link-interno"
            onClick={() => handleNavigate("/cursos-y-eventos", "eventos")}
          >
            ‘Cursos y Eventos’
          </span>{" "}
          de nuestra página web. También podés hacerlo presencialmente en la
          biblioteca. Una vez completado, recibirás la confirmación por correo
          electrónico o teléfono.
        </p>
      ),
    },
    {
      pregunta: "🔍 ¿Cómo busco un libro en el catálogo?",
      respuesta: (
        <p>
          En la sección{" "}
          <span
            className="link-interno"
            onClick={() => handleNavigate("/catalogo", "catalogo")}
          >
            ‘Catálogo’
          </span>{" "}
          podés buscar libros por título, autor o palabra clave. Además, podés
          filtrar por género o disponibilidad. Esto facilita encontrar el
          material que necesites antes de acercarte a la biblioteca.
        </p>
      ),
    },
    {
      pregunta: "👧👦 ¿Hay actividades para niños y adolescentes?",
      respuesta: (
        <p>
          Sí, tenemos talleres de lectura, narración de cuentos, talleres de
          escritura creativa y actividades culturales para niños, adolescentes y
          adultos. Revisá el calendario de eventos en la sección{" "}
          <span
            className="link-interno"
            onClick={() => handleNavigate("/cursos-y-eventos", "eventos")}
          >
            ‘Cursos y Eventos’
          </span>
          .
        </p>
      ),
    },
    {
      pregunta: "🎁 ¿Puedo donar libros o materiales?",
      respuesta: (
        <p>
          ¡Sí! Las donaciones son fundamentales para el crecimiento de la
          Biblioteca Popular “Dr. Antonio Novaro”. Aceptamos libros en buen
          estado, material educativo, revistas culturales, etc.
          Podés acercarte a la biblioteca en{" "}
          <strong>Moreno 30, Chivilcoy</strong>, o comunicarte al{" "}
          <strong>(2346) 432493</strong>. Cada aporte, grande o pequeño, ayuda a
          mantener viva la lectura y la cultura local. 💛
        </p>
      ),
    },
    {
      pregunta: "🎭 ¿Qué tipo de eventos realiza la biblioteca?",
      respuesta: (
        <p>
          A lo largo del año organizamos talleres, exposiciones artísticas,
          charlas educativas, presentaciones de libros, ferias del libro y
          muchas otras actividades abiertas a la comunidad. Nuestro auditorio y
          salas también se utilizan para encuentros culturales y escolares.
        </p>
      ),
    },
    {
      pregunta: "💻 ¿Tienen acceso a internet o computadoras?",
      respuesta: (
        <p>
          Sí. La biblioteca cuenta con computadoras de uso público y acceso
          gratuito a internet Wi-Fi para socios y visitantes. Es un espacio ideal
          para estudiar, investigar o disfrutar de la lectura digital.
        </p>
      ),
    },
    {
      pregunta: "🕓 ¿Cuál es el horario de atención?",
      respuesta: (
        <p>
          Estamos abiertos de lunes a viernes de <strong>8:00 a 19:00</strong> y
          los sábados de <strong>9:00 a 13:00</strong>. Fuera de ese horario,
          podés comunicarte por correo o redes sociales y responderemos tus
          consultas a la brevedad.
        </p>
      ),
    },
  ];

  return (
    <div className="preguntas-page">
      <h1>❓ Preguntas Frecuentes</h1>

      <div className="preguntas-container">
        {preguntas.map((item, index) => (
          <div key={index} className="pregunta-card">
            <h2>{item.pregunta}</h2>
            {item.respuesta}
          </div>
        ))}
      </div>

      <p className="curiosidad">
        <strong><em>"La curiosidad es la llave que abre la puerta del conocimiento."</em></strong>
      </p>
    </div>
  );
};

export default Questions;
