const express = require("express");
const { validate, schemas } = require("../middlewares/validacion");
const UsuarioController = require("../controllers/UsuarioController");

const router = express.Router();

// Rutas
router.get("/", UsuarioController.obtenerUsuarios);
router.post("/", validate(schemas.crearUsuario), UsuarioController.crearUsuario);
router.post("/:id/marcar-pelicula", validate(schemas.asignarPelicula), UsuarioController.marcarPelicula);

module.exports = router;
