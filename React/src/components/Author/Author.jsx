import { useEffect, useState } from "react";
import "./Author.css";

const authors = [
  {
    name: "Domingo Faustino Sarmiento (1811–1888)",
    image: "/Images/Sarmiento.jpg",
    bio: `Conocido como “El Padre del Aula”, fue escritor, educador, periodista y presidente argentino.
Dedicó su vida a una misión: educar para transformar la nación. Creía que la verdadera independencia se lograba con conocimiento y escuelas abiertas para todos.
Su obra más famosa, Facundo o civilización y barbarie, analizó el país profundo y propuso un modelo de progreso basado en la educación y la cultura.
Sarmiento cambió la historia argentina al convertir la enseñanza en una causa nacional.`,
    facts: [
      "Fue llamado “El Padre del Aula” por su lucha incansable por la educación pública.",
      "Fundó más de 800 escuelas durante su gestión.",
      "Promovió la educación de las mujeres y la formación docente.",
      "Su rostro aparece en el billete de $50.",
      "En su honor, cada 11 de septiembre se celebra el Día del Maestro.",
    ],
  },
  {
    name: "José Hernández (1834–1886)",
    image: "/Images/jh.jpg",
    bio: `Poeta, periodista y político argentino, José Hernández dio voz al alma del pueblo. Su obra Martín Fierro no solo es el poema nacional: es un retrato vivo del gaucho, símbolo de libertad, injusticia y resistencia.
A través de un lenguaje sencillo y profundo, logró que el mundo conociera el espíritu del campo argentino y la lucha de quienes fueron marginados por la sociedad.
Su pluma convirtió la vida rural en identidad y orgullo nacional.`,
    facts: [
      "Martín Fierro fue recitado y cantado en fogones gauchos antes de publicarse como libro.",
      "Su poema fue traducido a más de 30 idiomas.",
      "Defendió los derechos de los gauchos y los trabajadores rurales desde la política.",
      "Es considerado el mayor representante de la literatura gauchesca.",
      "Su casa natal en Buenos Aires es hoy un museo histórico.",
    ],
  },
  {
    name: "Juana Manso (1819–1875)",
    image: "/Images/juana_manso1.jpg",
    bio: `Fue escritora, educadora y una de las primeras feministas argentinas. Dedicó su vida a promover la educación pública, laica y para todos, en una época en la que las mujeres tenían pocas oportunidades.
Colaboró con Domingo F. Sarmiento, dirigió revistas educativas y escribió novelas que defendían la libertad y la igualdad.
Su visión moderna y su lucha por los derechos de las mujeres la convirtieron en una pionera del pensamiento progresista argentino.`,
    facts: [
      "Fue la primera mujer en ocupar un cargo público en educación.",
      "Fundó revistas y escuelas cuando las mujeres ni siquiera podían votar.",
      "Defendió que la educación debía ser un derecho universal.",
      "Es considerada una precursora del feminismo latinoamericano.",
    ],
  },
  {
    name: "Jorge Luis Borges (1899–1986)",
    image: "/Images/J.L.Borges.jpg",
    bio: `Considerado uno de los escritores más importantes del siglo XX, Jorge Luis Borges transformó la literatura universal con su imaginación sin límites.
Sus cuentos mezclan filosofía, laberintos, espejos, tiempo y sueños, invitando al lector a perderse —y encontrarse— entre sus páginas.
Autor de obras emblemáticas como Ficciones y El Aleph, Borges cambió la forma de contar historias y demostró que la literatura puede ser un infinito de ideas.
Fue poeta, ensayista, traductor y maestro. Amaba las bibliotecas y los libros tanto como a la palabra misma.`,
    facts: [
      "Fue ciego gran parte de su vida, pero siguió escribiendo y dictando clases.",
      "Dirigió la Biblioteca Nacional de Argentina.",
      "Nunca recibió el Premio Nobel de Literatura, aunque fue nominado varias veces.",
      "Su obra influyó en escritores de todo el mundo.",
      "Amaba los laberintos, los tigres y los espejos.",
    ],
  },
  {
    name: "Julio Cortázar (1914–1984)",
    image: "/Images/JCortazar.jpg",
    bio: `Julio Cortázar fue un maestro del cuento y la imaginación, uno de los autores más creativos e influyentes de la literatura argentina y latinoamericana.
Con un estilo único, mezcló lo cotidiano con lo fantástico.
Su novela Rayuela rompió todas las reglas y convirtió al lector en protagonista.`,
    facts: [
      "Nació en Bélgica, pero se crió en Argentina.",
      "Fue profesor, traductor y diplomático.",
      "Escribía escuchando jazz.",
      "Rayuela puede leerse en distintos órdenes.",
      "Inventó los famosos cronopios.",
    ],
  },
  {
    name: "Ernesto Sabato (1911–2011)",
    image: "/Images/ErnestoSabato.jpg",
    bio: `Ernesto Sabato fue uno de los pensadores y novelistas más intensos de la literatura argentina.
Físico de formación y escritor por vocación, dejó la ciencia para explorar el alma humana.
Su obra se distingue por la profundidad psicológica y la reflexión existencial.`,
    facts: [
      "Abandonó la ciencia por la literatura.",
      "Presidió la CONADEP.",
      "Fue también pintor.",
      "El túnel fue adaptada al cine.",
      "Publicó Antes del fin a los 99 años.",
    ],
  },
  {
    name: "María Elena Walsh (1930–2011)",
    image: "/Images/MariaEW.jpeg",
    bio: `Fue escritora, poeta y compositora argentina que transformó la literatura infantil.
Creó un universo de imaginación y poesía que marcó generaciones.`,
    facts: [
      "Publicó su primer libro a los 17 años.",
      "Defendió la libertad en tiempos de censura.",
      "Sus canciones se enseñan en escuelas.",
      "Es un ícono cultural argentino.",
    ],
  },
];

export default function Author() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % authors.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const author = authors[currentIndex];

  return (
    <section className="author-carousel-section">
      <div className="author-card">
        <div className="author-left">
          <img
            src={author.image}
            alt={author.name}
            className="author-image"
          />
        </div>

        <div className="author-right">
          <div className="author-name">{author.name}</div>
          <div className="author-bio">{author.bio}</div>
        </div>

        <div className="author-facts">
          <div className="author-facts-title">Sabías que</div>
          <ul className="author-facts-list">
            {author.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}