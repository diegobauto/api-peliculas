const express = require("express");
const NovedadController = require("../controllers/NovedadController");

const router = express.Router();

// Rutas
router.get("/", NovedadController.obtenerNovedades);

module.exports = router;
