const { CustomError } = require("../middlewares/errorHandler");
const UsuarioRepository = require("../repositories/UsuarioRepository");
const PeliculaRepository = require("../repositories/PeliculaRepository");
const bcrypt = require("bcryptjs");

class UsuarioService {
  async crearUsuario(usuarioData) {
    // Verificar si el correo ya existe
    const usuarioExistente = await UsuarioRepository.obtenerUsuarioPorEmail(usuarioData.correo);
    if (usuarioExistente) {
      throw new CustomError("El correo electrónico ya está en uso", 400);
    }

    // Hashear contraseña
    const hash = await bcrypt.hash(usuarioData.contrasena, 12);

    return await UsuarioRepository.crearUsuario({
      ...usuarioData,
      contrasena: hash,
    });
  }

  async obtenerUsuarios(query = {}) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const { usuarios, total } = await UsuarioRepository.obtenerUsuarios(page, limit);
    const totalPaginas = Math.ceil(total / limit);

    return {
      usuarios,
      metadata: {
        paginaActual: page,
        totalPaginas,
        totalItems: total,
        limit,
      },
    };
  }

  async marcarPelicula(id_usuario, marcarData) {
    // Verificar si el usuario existe
    const usuario = await UsuarioRepository.obtenerUsuarioPorId(id_usuario);
    if (!usuario) {
      throw new CustomError("El usuario no existe", 400);
    }

    // Verificar si la película existe
    const pelicula = await PeliculaRepository.obtenerPeliculaPorId(marcarData.id_pelicula);
    if (!pelicula) {
      throw new CustomError("La película no existe", 400);
    }

    return await UsuarioRepository.marcarPelicula(id_usuario, marcarData);
  }
}

module.exports = new UsuarioService();
