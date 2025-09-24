const express = require("express");
const { validate, schemas } = require("../middlewares/validacion");
const PeliculaController = require("../controllers/PeliculaController");

const router = express.Router();

// Rutas
router.get("/", PeliculaController.obtenerPeliculas);
router.post("/", validate(schemas.crearPelicula), PeliculaController.crearPelicula);

module.exports = router;
