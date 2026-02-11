import React from "react";
import "./Questions.css";

const preguntas = [
  {
    pregunta: "¿Cómo me hago socio?",
    respuesta: "Para ser socio de la Biblioteca Popular de Chivilcoy, solo necesitás presentarte con tu DNI y completar la planilla de inscripción en la biblioteca. La inscripción es gratuita y te permite acceder a libros, salas de lectura y talleres culturales."
  },
  {
    pregunta: "¿Cómo puedo inscribirme a un curso o taller?",
    respuesta: "La inscripción a cursos y talleres se realiza completando un formulario disponible en la sección 'Cursos y eventos' de nuestra página web. También podés hacerlo presencialmente en la biblioteca. Una vez completado, recibirás la confirmación por correo electrónico o teléfono."
  },
  {
    pregunta: "¿Cómo busco un libro en el catálogo?",
    respuesta: "En la sección 'Catálogo' de nuestra web podés buscar libros por título, autor o palabra clave. Además, podés filtrar por género o disponibilidad. Esto facilita encontrar el material que necesites antes de acercarte a la biblioteca."
  },
  
  {
    pregunta: "¿Hay actividades para niños y adolescentes?",
    respuesta: "Sí, tenemos talleres de lectura, narración de cuentos, talleres de escritura creativa y actividades culturales para niños, adolescentes y adultos. Revisá el calendario de eventos en la sección 'Cursos y eventos'."
  }
];

const Questions = () => {
  return (
    <div className="preguntas-page">
      <h1>❓ Preguntas Frecuentes</h1>
      <div className="preguntas-container">
        {preguntas.map((item, index) => (
          <div key={index} className="pregunta-card">
            <h2>{item.pregunta}</h2>
            <p dangerouslySetInnerHTML={{ __html: item.respuesta }}></p>
          </div>
        ))}
      </div>
      <p className="curiosidad"><em>"La curiosidad es la llave que abre la puerta del conocimiento."</em></p>
    </div>
  );
};

export default Questions;
