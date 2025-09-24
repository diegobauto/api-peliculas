-- Activar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla Categorías
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla Usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla Películas
CREATE TABLE peliculas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_categoria UUID NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_estreno DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id)
);

-- Tabla pivote: películas vistas por usuarios
CREATE TABLE peliculas_usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_usuario UUID NOT NULL,
    id_pelicula UUID NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Sirve tambien para la fecha en la que se vio la pelicula
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id),
    UNIQUE (id_usuario, id_pelicula)
);

-- Índices
CREATE INDEX idx_peliculas_categoria ON peliculas(id_categoria);
CREATE INDEX idx_peliculas_fecha_estreno ON peliculas(fecha_estreno);
CREATE INDEX idx_peliculas_titulo ON peliculas(titulo);
CREATE INDEX idx_peliculas_activa ON peliculas(activo);

-- Insertar categorías precargadas
INSERT INTO categorias (nombre, descripcion) VALUES
('Terror', 'Películas de terror y horror'),
('Suspenso', 'Películas de suspenso y thriller'),
('Drama', 'Películas dramáticas'),
('Comedia', 'Películas de comedia y humor');
