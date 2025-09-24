const pool = require("../database/database");

class CategoriaRepository {
  async obtenerCategoria(id) {
    const { rows } = await pool.query(
      `SELECT id, nombre, descripcion, activo, fecha_creacion, fecha_actualizacion
      FROM categorias
      WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async obtenerCategorias(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // Optimizar tiempo
    const [categoriasResult, totalResult] = await Promise.all([
      pool.query(
        `SELECT id, nombre, descripcion, activo, fecha_creacion, fecha_actualizacion
        FROM categorias
        ORDER BY fecha_creacion DESC
        LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query(`SELECT COUNT(*) FROM categorias`),
    ]);

    const total = parseInt(totalResult.rows[0].count, 10);
    return { categorias: categoriasResult.rows, total };
  }
}

module.exports = new CategoriaRepository();
