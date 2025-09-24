const PeliculaService = require("../services/PeliculaService");
const { catchAsync } = require("../middlewares/errorHandler");

class PeliculaController {
  /**
   * @swagger
   * /peliculas:
   *   post:
   *     tags:
   *       - Peliculas
   *     summary: Crear una pelicula
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PeliculaInput'
   *     responses:
   *       201:
   *         description: Pelicula creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: number
   *                   example: 201
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Pelicula creada exitosamente
   *                 data:
   *                   type: object
   *                   $ref: '#/components/schemas/Pelicula'
   *       400:
   *         description: La categoría no existe / La película ya existe
   */
  crearPelicula = catchAsync(async (req, res) => {
    const pelicula = await PeliculaService.crearPelicula(req.body);
    res.status(201).json({
      status: 201,
      success: true,
      message: "Pelicula creada exitosamente",
      data: pelicula,
    });
  });

  /**
   * @swagger
   * /peliculas:
   *   get:
   *     tags:
   *       - Peliculas
   *     summary: Obtener lista de peliculas por fecha de estreno
   *     parameters:
   *       - in: query
   *         name: titulo
   *         schema:
   *           type: string
   *         description: Filtrar por el titulo de la pelicula
   *       - in: query
   *         name: id_categoria
   *         schema:
   *           type: string
   *           format: uuid
   *         description: Filtrar por la categoría de la pelicula
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *     responses:
   *       200:
   *         description: Lista de peliculas obtenida exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: number
   *                   example: 200
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Lista de peliculas obtenida exitosamente
   *                 data:
   *                   type: array
   *                   items:
   *                    $ref: '#/components/schemas/Pelicula'
   *                 metadata:
   *                   type: object
   *                   example: {}
   */
  obtenerPeliculas = catchAsync(async (req, res) => {
    const { peliculas, metadata } = await PeliculaService.obtenerPeliculas(req.query);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Lista de peliculas obtenida exitosamente",
      data: peliculas,
      metadata: metadata,
    });
  });
}

module.exports = new PeliculaController();
