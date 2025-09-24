const NovedadService = require("../services/NovedadService");
const { catchAsync } = require("../middlewares/errorHandler");

class NovedadController {
  /**
   * @swagger
   * /novedades:
   *   get:
   *     tags:
   *       - Novedades
   *     summary: Obtener lista de novedades
   *     description: Una pelicula es categorizada como novedad si su fecha de estreno es inferior a tres semanas
   *     parameters:
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
   *         description: Lista de novedades obtenida exitosamente
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
   *                   example: Lista de novedades obtenida exitosamente
   *                 data:
   *                   type: array
   *                   items:
   *                    $ref: '#/components/schemas/Pelicula'
   *                 metadata:
   *                   type: object
   *                   example: {}
   */
  obtenerNovedades = catchAsync(async (req, res) => {
    const { novedades, metadata } = await NovedadService.obtenerNovedades(req.query);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Lista de novedades obtenida exitosamente",
      data: novedades,
      metadata: metadata,
    });
  });
}

module.exports = new NovedadController();
