const UsuarioService = require("../services/UsuarioService");
const { catchAsync } = require("../middlewares/errorHandler");

class UsuarioController {
  /**
   * @swagger
   * /usuarios:
   *   post:
   *     tags:
   *       - Usuarios
   *     summary: Crear un usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UsuarioInput'
   *     responses:
   *       201:
   *         description: Usuario creado exitosamente
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
   *                   example: Usuario creado exitosamente
   *                 data:
   *                   type: object
   *                   $ref: '#/components/schemas/Usuario'
   *       400:
   *         description: El correo electronico ya esta en uso
   */
  crearUsuario = catchAsync(async (req, res) => {
    const usuario = await UsuarioService.crearUsuario(req.body);
    res.status(201).json({
      status: 201,
      success: true,
      message: "Usuario creado exitosamente",
      data: usuario,
    });
  });

  /**
   * @swagger
   * /usuarios:
   *   get:
   *     tags:
   *       - Usuarios
   *     summary: Obtener lista de usuarios
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: Numero de pagina
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         description: Número de registros por pagina
   *     responses:
   *       200:
   *         description: Lista de usuarios obtenida exitosamente
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
   *                   example: Lista de usuarios obtenida exitosamente
   *                 data:
   *                   type: array
   *                   items:
   *                      $ref: '#/components/schemas/Usuario'
   *                 metadata:
   *                   type: object
   *                   example: {}
   */
  obtenerUsuarios = catchAsync(async (req, res) => {
    const { usuarios, metadata } = await UsuarioService.obtenerUsuarios(req.query);
    res.status(200).json({
      status: 200,
      success: true,
      message: "Lista de usuarios obtenida exitosamente",
      data: usuarios,
      metadata: metadata,
    });
  });

  /**
   * @swagger
   * /usuarios/{id}/marcar-pelicula:
   *   post:
   *     tags:
   *       - Usuarios
   *     summary: Marcar pelicula como vista por un usuario
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PeliculaUsuarioInput'
   *     responses:
   *       200:
   *         description: La película fue marcada como vista por el usuario exitosamente
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
   *                   example: La película fue marcada como vista por el usuario exitosamente
   *                 data:
   *                   type: array
   *                   items:
   *                      $ref: '#/components/schemas/Usuario'
   *                 metadata:
   *                   type: object
   *                   example: {}
   *       400:
   *         description: El usuario no existe / La pelicula no existe
   */
  marcarPelicula = catchAsync(async (req, res) => {
    const id_usuario = req.params.id;
    const usuario  = await UsuarioService.marcarPelicula(id_usuario,req.body);
    res.status(200).json({
      status: 200,
      success: true,
      message: "La película fue marcada como vista por el usuario exitosamente",
      data: usuario,
    });
  });
}

module.exports = new UsuarioController();
