-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 04-11-2025 a las 19:07:48
-- Versión del servidor: 5.7.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hexagonal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `body` longtext NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articles`
--

INSERT INTO `articles` (`id`, `title`, `image`, `date`, `body`, `deleted`) VALUES
(1, 'La Divina Comedia y el Arte: un viaje visual al más allá', 'http://localhost:9000/imagenes/noticia1-20251021-165707.jpeg', '2025-10-21 16:57:19', 'El próximo viernes 18 de julio a las 18 hs, la Biblioteca Popular de Chivilcoy será escenario de una propuesta única: “La Divina Comedia y el Arte: un viaje visual al más allá”, una charla a cargo de Maximiliano Martino.\n\nEl encuentro invita a redescubrir la obra inmortal de Dante Alighieri, uno de los pilares de la literatura universal, a través de un recorrido visual que une la poesía, la simbología y la historia del arte. A lo largo de la actividad, se explorará cómo La Divina Comedia ha inspirado a artistas de todas las épocas —desde el Renacimiento hasta el arte contemporáneo—, transformando las visiones del Infierno, el Purgatorio y el Paraíso en imágenes cargadas de emoción y significado.\n\nEl evento propone una experiencia estética y reflexiva, donde la palabra escrita se encuentra con la imagen plástica para ofrecer una nueva lectura del viaje espiritual de Dante. En un tiempo donde el arte y la literatura siguen siendo fuentes de comprensión del alma humana, esta charla busca acercar al público general y a los amantes de la cultura a una obra que sigue viva más de siete siglos después de su creación.\n\nLa entrada es libre y gratuita, y se espera la participación de estudiantes, docentes y público interesado en las relaciones entre la literatura y las artes visuales.', 0),
(2, 'La Biblioteca Popular Antonio Novaro celebra 130 años de historia', 'http://localhost:9000/imagenes/Noticia2-20251021-170138.jpeg', '2025-10-21 17:01:51', 'La Biblioteca Popular Antonio Novaro de Chivilcoy celebrará sus 130 años de vida institucional el próximo domingo 13 de julio a las 18 hs, con un acto oficial abierto a toda la comunidad.\n\nDurante el encuentro, se realizará un recorrido por los inicios de la institución, se leerá el Acta Fundacional y se presentará una fotografía restaurada de Juana Manso, figura clave en la historia de la educación y la cultura popular argentina.\n\nEl evento busca rendir homenaje a todos aquellos que, a lo largo de más de un siglo, contribuyeron al crecimiento de la biblioteca, promoviendo el acceso al conocimiento, la lectura y la participación ciudadana.\n\nLa jornada culminará con un brindis y un espectáculo musical a cargo de Alondra, en el auditorio de la biblioteca, en un ambiente de celebración y encuentro con la memoria cultural de Chivilcoy.', 0),
(3, '“Memoria de un Poeta” llega a Chivilcoy en su gira por las bibliotecas populares', 'http://localhost:9000/imagenes/noticia3-20251021-170314.jpg', '2025-10-21 17:03:27', 'En el marco de su recorrido por distintas bibliotecas del país, la obra “Memoria de un Poeta” se presentará el domingo 20 de julio a las 17 hs en la Biblioteca Popular Antonio Novaro, ubicada en Moreno 30, Chivilcoy.\n\nLa propuesta teatral invita a reflexionar sobre la palabra, la identidad y la memoria, a través de una historia sensible que rescata la figura del poeta como símbolo de resistencia cultural. Con interpretaciones profundas y un guion cargado de emoción, la obra busca revalorizar el papel del arte en la preservación de la memoria colectiva.\n\nEl evento forma parte de una iniciativa que promueve la difusión cultural en espacios comunitarios, acercando el teatro y la literatura a nuevos públicos.\nLas entradas pueden reservarse al 11 5020-0637 o por correo electrónico a memoriadeunpoetaenbibliotecas@gmail.com', 0),
(4, '23 de abril: Día Mundial del Libro', 'http://localhost:9000/imagenes/noticia4-20251021-170829.jpg', '2025-10-21 17:08:41', 'Cada 23 de abril se celebra el Día Mundial del Libro y del Derecho de Autor, una fecha que rinde homenaje a tres figuras fundamentales de la literatura universal: Miguel de Cervantes, William Shakespeare e Inca Garcilaso de la Vega, quienes fallecieron en esta misma jornada en el año 1616. Esta coincidencia simbólica fue elegida por la UNESCO para destacar el poder transformador de la lectura y la importancia de los libros como puentes entre culturas, generaciones e ideas.\n\nEn la Biblioteca Popular de Chivilcoy, esta fecha nos invita a renovar nuestro compromiso con la promoción de la lectura, el acceso libre al conocimiento y la preservación de nuestra memoria colectiva. Los libros no solo nos educan: nos acompañan, nos desafían y nos conectan con mundos posibles.\n\n¿Por qué el 23 de abril?\n\nMiguel de Cervantes, autor de Don Quijote de la Mancha, revolucionó la narrativa moderna con su mirada crítica y humanista.\n\nWilliam Shakespeare, dramaturgo inglés, dejó un legado inmenso en el teatro y la poesía, explorando la complejidad del alma humana.\n\nInca Garcilaso de la Vega, primer mestizo reconocido en la literatura hispanoamericana, fusionó las tradiciones indígenas y europeas en obras que aún hoy nos interpelan.\n\nCelebrar el libro es celebrar la libertad En tiempos de sobreinformación y pantallas constantes, el libro sigue siendo un refugio, una herramienta de pensamiento profundo y una forma de resistencia cultural. Desde nuestra biblioteca, impulsamos actividades que fomentan la lectura crítica, el diálogo intergeneracional y el rescate de autores locales y regionales.\n\nInvitación a la comunidad Este 23 de abril te invitamos a recorrer nuestras estanterías, descubrir nuevas voces y reencontrarte con aquellas lecturas que marcaron tu historia. Porque cada libro leído es una conversación que continúa, una semilla que germina en el tiempo.', 0),
(5, 'Presentación del libro Como Serpientes de Gina Viscardi', 'http://localhost:9000/imagenes/noticia5-20251021-171130.jpg', '2025-10-21 17:11:43', 'La Biblioteca Antonio Novaro se complace en invitar a la comunidad a la presentación de Como Serpientes, la nueva novela de Gina Viscardi, una obra que nos sumerge en un universo donde la astucia es la única vía de supervivencia.\n\nUn mundo de sagacidad, aventura y manipulación Con una narrativa intensa y provocadora, Como Serpientes explora los límites de la fidelidad, la manipulación y la inteligencia estratégica. En este mundo ficticio, cada decisión puede ser letal, y solo quienes dominan el arte de la sagacidad logran avanzar. La autora construye una trama envolvente que interpela al lector desde la primera página, con personajes complejos y giros inesperados.\n\n \nFechas de presentación\n29 de abril y 6 de mayo, a las 10:00 hs\n\nLugar: Biblioteca Antonio Novaro, Moreno 30\n\nCupos limitados – Confirmar asistencia al 2346 31-4585\nSobre la autora Gina Viscardi es una escritora que se destaca por su estilo directo y su capacidad para construir mundos narrativos cargados de tensión psicológica. En esta obra, retoma temas universales como el poder, la lealtad y la supervivencia, pero los reinterpreta desde una mirada contemporánea y provocadora.\n\nUna experiencia literaria imperdible La presentación incluirá una charla con la autora, lectura de fragmentos seleccionados y espacio para preguntas del público. Será una oportunidad única para conocer el proceso creativo detrás de una novela que ya está dando que hablar.', 0),
(6, '20 de junio: Día del Escritor/a Chivilcoyano/a', 'http://localhost:9000/imagenes/WhatsApp%20Image%202025-10-21%20at%2017.06.46-20251021-171416.jpeg', '2025-10-21 17:14:29', 'Cada 20 de junio celebramos el Día del Escritor/a Chivilcoyano/a, una fecha que honra el legado literario de nuestra ciudad y conmemora el natalicio del poeta y escritor local Miguel D. Torres, figura clave en la construcción de nuestra identidad cultural.\n\nUn encuentro con la palabra La Biblioteca Popular Antonio Novaro invita a toda la comunidad al Encuentro de Lectura que se realizará el 20 de junio de 2025 a las 16:30 hs, en nuestra sede de Moreno 30, Chivilcoy. Será una jornada dedicada a compartir textos, voces y memorias que nos conectan con el alma literaria de nuestra ciudad.\n\nMiguel D. Torres: poesía y pertenencia Nacido en Chivilcoy, Miguel D. Torres supo retratar con sensibilidad y profundidad los paisajes, emociones y personajes de nuestra región. Su obra, marcada por una lírica íntima y comprometida, continúa inspirando a nuevas generaciones de escritores y lectoras.\n\nCelebrar lo nuestro Este día no solo recuerda a un autor, sino que celebra a todas las personas que, desde Chivilcoy, han elegido la escritura como forma de expresión, resistencia y creación. Desde la biblioteca, reafirmamos nuestro compromiso con el fomento de la literatura local y el reconocimiento de quienes enriquecen nuestro patrimonio cultural con sus palabras.\nActividades\n\nLectura colectiva de textos de autores chivilcoyanos\n\nEspacio abierto para compartir producciones propias\n\nRonda de reflexión sobre la escritura como identidad', 0),
(7, 'Noticia', 'http://localhost:9000/imagenes/Copilot_20251029_174215-20251104-153120.png', '2025-11-04 15:31:34', 'Contenido', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `materia` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `editorial` varchar(255) NOT NULL,
  `edicion` varchar(255) NOT NULL,
  `anio` int(11) NOT NULL,
  `disponibilidad` tinyint(1) NOT NULL,
  `reservada` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `codigo`, `materia`, `titulo`, `autor`, `editorial`, `edicion`, `anio`, `disponibilidad`, `reservada`) VALUES
(23, 'LIT-001', 'Literatura', 'Cien años de soledad', 'Gabriel García Márquez', 'Sudamericana', '1a ed.', 1967, 1, 0),
(24, 'INF-002', 'Infantil', 'El principito', 'Antoine de Saint-Exupéry', 'Salamandra', 'Reimpresión', 1943, 0, 0),
(25, 'ENS-003', 'Ensayo', 'El Aleph', 'Jorge Luis Borges', 'Emecé', '3a ed.', 1949, 1, 0),
(26, 'HIS-004', 'Historia', 'Historia Argentina', 'Felipe Pigna', 'Planeta', '1a ed.', 2004, 1, 0),
(27, 'INF-005', 'Informática', 'Introducción a la Programación', 'Luis Joyanes', 'McGraw-Hill', '2a ed.', 2020, 1, 0),
(28, 'CIE-006', 'Ciencia', 'Breves respuestas a las grandes preguntas', 'Stephen Hawking', 'Crítica', '1a ed.', 2018, 1, 0),
(29, 'HIS-007', 'Historia', 'Constitución de la Nación Argentina (1853) – Facsímil', 'Varios', 'Edición facsimilar', 'Ed. especial', 1853, 1, 1),
(30, 'LIT-008', 'Literatura', 'Rayuela', 'Julio Cortázar', 'Sudamericana', '1a ed.', 1963, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domains`
--

CREATE TABLE `domains` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `domains`
--

INSERT INTO `domains` (`id`, `name`, `code`, `deleted`) VALUES
(1, 'Mi primer dominio', 'domain-1', 0),
(2, 'Mi segundo dominio', 'domain-2', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `end_date` date DEFAULT NULL,
  `is_Active` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `image`, `end_date`, `is_Active`, `deleted`) VALUES
(8, 'titulo-nuevo', 'descripcion-nueva', '', '2025-09-24', 1, 0),
(11, 'titulo', 'descripcion 1', 'http://localhost:9000/imagenes/ajedrez-20251022-114248.jpg', '2025-09-18', 1, 0),
(13, 'titulo', 'info', 'http://localhost:9000/imagenes/biblioteca-20251022-114055.jpg', '2026-06-25', 1, 1),
(15, 'Evento Ajedrez', 'Lunes Miercoles y Viernes.\n19hs a 21hs.', 'http://localhost:9000/imagenes/ajedrez-20251024-095134.jpg', '2025-12-20', 1, 0),
(16, 'Curos Teatro', 'Martes y Jueves.\nde 14:00hs a 15:30hs', 'http://localhost:9000/imagenes/biblioteca-20251024-100618.jpg', '2025-12-10', 1, 0),
(17, 'Ultimo Curso', 'curso de ajedrez ultimo en el anio', 'http://localhost:9000/imagenes/ajedrez-20251104-111020.jpg', '2025-12-12', 1, 1),
(18, 'titulo ultimo', 'ultima descr', 'http://localhost:9000/imagenes/biblioteca-20251104-114049.jpg', '2025-12-15', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscriptions`
--

CREATE TABLE `inscriptions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` bigint(11) NOT NULL,
  `id_event` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inscriptions`
--

INSERT INTO `inscriptions` (`id`, `name`, `surname`, `email`, `phone`, `id_event`) VALUES
(10, 'Matias', 'Gardella', 'prueba1@gmail.com', 2346330076, 13),
(12, 'Prueba', 'prueb', 'prieba@mail.com', 2345982121, 13),
(13, 'matias', 'gardella', 'matias@hotmail.com', 2346459334, 11),
(14, 'Matias ', 'Gardella', 'matiasgardella5@gmail.com', 2346330076, 15),
(15, 'PRUEBA', 'PRUEBA', 'newprueba@gmail.com', 2346330076, 17),
(16, 'dad', 'adad', 'adada@mail.com', 2345321232, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_auth_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `is_blocked` tinyint(1) DEFAULT '0',
  `failed_attempts` int(11) DEFAULT '0',
  `failed_ip` varchar(64) DEFAULT NULL,
  `soft_block_until` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `apellido`, `dni`, `email`, `password`, `token`, `token_auth_date`, `role`, `is_active`, `is_blocked`, `failed_attempts`, `failed_ip`, `soft_block_until`) VALUES
(41, 'Cane', 'Corso', '808080808', 'canecorso@biblioteca.com', '$2y$10$bhqy.FxL6VAtnL/h2LAOd.BWAizKGheZTZ7ZIAAels7J9BMHPHlKO', 'eb359c48829128ea194df678c25a99b0', '2025-10-28 21:31:10', 'admin', 1, 0, 0, NULL, NULL),
(42, 'Dogo', 'Argentino', '404040404', 'dogoargentino@biblioteca.com', '$2y$10$tFSaV2xDOz8j0fehrQb4g.ZvWag7zcLEJfE8xlaZhNYDsVQJn3fme', '006ad1c4b8332e4b07cae964fa1cac35', '2025-11-03 11:05:04', 'admin', 1, 1, 0, NULL, NULL),
(44, 'Kangal', 'Turco', '121212121', 'kangal@biblioteca.com', '$2y$10$fO2buUDi3SCFvlK61vDG/eMND84OvfHpFN6pOfIuOfAPG/QSqqavK', '8b7ebe012dd1e2fa30e451297cfbd58a', '2025-11-04 03:23:55', 'super_adm', 1, 1, 9, '172.18.0.1', '2025-11-04 19:21:11'),
(51, 'Administrador', 'Administrador', '353535353', 'admin@biblioteca.com', '$2y$10$qFvXkhQKZRb.Se6ZPnfb9edN6VO2Tfkyerusv2.ggLuh9HYP7UK8a', '6547d01c26b63596d3ec69471d99a6bc', '2025-11-04 04:48:17', 'super_adm', 1, 0, 1, '172.18.0.1', NULL),
(56, 'Pastor', 'Belga', '12345678', 'pastor@biblioteca.com', '$2y$10$PzxFqQejr8rt30WXwXwlfelBmA5WxZDJB8wV2VYIT2f9mJpEXOrjq', NULL, '2025-11-04 03:13:57', 'visitor', 0, 0, 0, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_event` (`id_event`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_users_email` (`email`),
  ADD KEY `idx_users_soft_block_until` (`soft_block_until`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `inscriptions`
--
ALTER TABLE `inscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD CONSTRAINT `fk_inscriptions_events` FOREIGN KEY (`id_event`) REFERENCES `events` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
