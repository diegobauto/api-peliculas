const pool = require("../database/database");

class NovedadRepository {
  async obtenerNovedades(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // Optimizar tiempo
    const [novedadesResult, totalResult] = await Promise.all([
      pool.query(
        `SELECT id, id_categoria, titulo, descripcion, fecha_estreno, activo, fecha_creacion, fecha_actualizacion
        FROM peliculas
        WHERE activo = TRUE
        AND fecha_estreno >= CURRENT_DATE - INTERVAL '21 days'
        ORDER BY fecha_estreno DESC
        LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query(
        `SELECT COUNT(*) 
        FROM peliculas
        WHERE activo = TRUE
        AND fecha_estreno >= CURRENT_DATE - INTERVAL '21 days'`
      ),
    ]);

    const total = parseInt(totalResult.rows[0].count, 10);
    return { novedades: novedadesResult.rows, total };
  }
}

module.exports = new NovedadRepository();
