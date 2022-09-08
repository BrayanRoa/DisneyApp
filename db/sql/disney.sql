CREATE TABLE `usuario` (
    `documento` varchar(12) NOT NULL,
    `nombre` varchar(20) NOT NULL,
    `id_tipo_documento` int NOT NULL,
    `apellido` varchar(20) NOT NULL,
    `correo` varchar(255) NOT NULL,
    `direccion` varchar(50) NOT NULL,
    `telefono` varchar(15) NOT NULL,
    `activo` bit not NULL default 1,
    `password` varchar(20) not null,
    PRIMARY KEY (`documento`),
    FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id`)
);

CREATE TABLE `tipo_documento` (
    `id` int NOT NULL,
    `nombre` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `personaje` (
    `nombre` varchar(30) NOT NULL,
    `edad` integer NOT NULL,
    `peso` varchar(10) NOT NULL,
    `historia` varchar(255) NOT NULL,
    `imagen` varchar(255) NOT NULL,
    `fecha_creacion` timestamp not null,
    PRIMARY KEY (`nombre`)
);

CREATE TABLE `entretenimiento` (
    `titulo` varchar(30) NOT NULL,
    `imagen` varchar(255) NOT NULL,
    `fecha_creacion` date NOT NULL,
    `calificacion` varchar(1) NOT NULL,
    `tipo` varchar(20) NOT NULL,
    `activo` bit not null default 1,
    PRIMARY KEY (`titulo`)
);

CREATE TABLE `entretenimiento_personaja` (
    `PersonajeNombre` varchar(30) NOT NULL,
    `entretenimientoTitulo` varchar(30) NOT NULL,
    FOREIGN KEY (`PersonajeNombre`) REFERENCES `personaje` (`nombre`),
    FOREIGN KEY (`entretenimientoTitulo`) REFERENCES `entretenimiento` (`titulo`)
);

CREATE TABLE `genero` (
    `nombre` varchar(20) NOT NULL,
    `imagen` varchar(255) NOT NULL,
    PRIMARY KEY (`nombre`)
);

CREATE TABLE `entretenimiento_personaja` (
    `GeneroNombre` varchar(30) NOT NULL,
    `entretenimientoTitulo` varchar(30) NOT NULL,
    FOREIGN KEY (`GeneroNombre`) REFERENCES `personaje` (`nombre`),
    FOREIGN KEY (`entretenimientoTitulo`) REFERENCES `entretenimiento` (`titulo`)
);