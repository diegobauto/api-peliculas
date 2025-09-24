const CategoriaService = require("../services/CategoriaService");
const { catchAsync } = require("../middlewares/errorHandler");

class CategoriaController {
  /**
   * @swagger
   * /categorias:
   *   get:
   *     tags:
   *       - Categorias
   *     summary: Obtener lista de categorias
   *     responses:
   *       200:
   *         description: Lista de categorias obtenida exitosamente
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
   *                   example: Lista de categorias obtenida exitosamente
   *                 data:
   *                   type: array
   *                   items:
   *                    $ref: '#/components/schemas/Categoria'
   *                 metadata:
   *                   type: object
   *                   example: {}
   */
  obtenerCategorias = catchAsync(async (req, res) => {  
    const { categorias, metadata } = await CategoriaService.obtenerCategorias(req.query);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Lista de categorias obtenida exitosamente",
      data: categorias,
      metadata: metadata,
    });
  });
}

module.exports = new CategoriaController();
