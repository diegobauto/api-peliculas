require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const { errorHandler } = require("./middlewares/errorHandler");

const usuariosRoutes = require("./routes/usuarios");
const peliculasRoutes = require("./routes/peliculas");
const novedadesRoutes = require("./routes/novedades");
const categoriasRoutes = require("./routes/categorias");

//Inicialización
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/usuarios", usuariosRoutes);
app.use("/peliculas", peliculasRoutes);
app.use("/novedades", novedadesRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger en ruta inicial (solo por practicidad)

// Respuestas manejo de errores
app.use(errorHandler);

// Escucha
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose / http://localhost:${PORT}/`);
});

module.exports = app;
