const express = require("express");
const CategoriaController = require("../controllers/CategoriaController");

const router = express.Router();

// Rutas
router.get("/", CategoriaController.obtenerCategorias);

module.exports = router;
