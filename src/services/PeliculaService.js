const { CustomError } = require("../middlewares/errorHandler");
const PeliculaRepository = require("../repositories/PeliculaRepository");
const CategoriaRepository = require("../repositories/CategoriaRepository");

class PeliculaService {
  async crearPelicula(peliculaData) {
    // Verificar si la categoría existe
    const categoria = await CategoriaRepository.obtenerCategoria(peliculaData.id_categoria);
    if (!categoria) {
      throw new CustomError("La categoría no existe", 400);
    }

    // Verificar si la película ya existe
    const peliculaExistente = await PeliculaRepository.obtenerPeliculaPorTitulo(peliculaData.titulo);
    if (peliculaExistente) {
      throw new CustomError("La película ya existe", 400);
    }
    
    return await PeliculaRepository.crearPelicula(peliculaData);
  }

  async obtenerPeliculas(query = {}) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const { peliculas, total } = await PeliculaRepository.obtenerPeliculas({
      page,
      limit,
      titulo: query.titulo,
      id_categoria: query.id_categoria,
    });

    const totalPaginas = Math.ceil(total / limit);

    return {
      peliculas,
      metadata: {
        paginaActual: page,
        totalPaginas,
        totalItems: total,
        limit,
      },
    };
  }
}

module.exports = new PeliculaService();
