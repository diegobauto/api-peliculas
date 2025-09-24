const NovedadRepository = require("../repositories/NovedadRepository");

class NovedadService {
  async obtenerNovedades(query = {}) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const { novedades, total } = await NovedadRepository.obtenerNovedades(page, limit);
    const totalPaginas = Math.ceil(total / limit);

    return {
      novedades,
      metadata: {
        paginaActual: page,
        totalPaginas,
        totalItems: total,
        limit,
      },
    };
  }
}

module.exports = new NovedadService();
