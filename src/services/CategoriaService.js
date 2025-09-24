const CategoriaRepository = require("../repositories/CategoriaRepository");

class CategoriaService {
  async obtenerCategorias(query = {}) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const { categorias, total } = await CategoriaRepository.obtenerCategorias(
      page,
      limit
    );
    const totalPaginas = Math.ceil(total / limit);

    return {
      categorias,
      metadata: {
        paginaActual: page,
        totalPaginas,
        totalItems: total,
        limit,
      },
    };
  }
}

module.exports = new CategoriaService();
