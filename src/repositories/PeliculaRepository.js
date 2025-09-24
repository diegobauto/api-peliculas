const pool = require("../database/database");

class PeliculaRepository {
  async crearPelicula({ id_categoria, titulo, descripcion, fecha_estreno }) {
    const { rows } = await pool.query(
      `INSERT INTO peliculas(id_categoria, titulo, descripcion, fecha_estreno) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_categoria, titulo, descripcion, fecha_estreno]
    );
    return rows[0];
  }

  async obtenerPeliculaPorTitulo(titulo) {
    const { rows } = await pool.query(
      `SELECT id, id_categoria, titulo, descripcion, fecha_estreno, activo, fecha_creacion, fecha_actualizacion 
      FROM peliculas 
      WHERE titulo ILIKE $1`,
      [titulo]
    );
    return rows[0] || null;
  }

  async obtenerPeliculaPorId(id) {
    const { rows } = await pool.query(
      `SELECT id, id_categoria, titulo, descripcion, fecha_estreno, activo, fecha_creacion, fecha_actualizacion  
      FROM peliculas 
      WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async obtenerPeliculas({ page = 1, limit = 10, titulo, id_categoria }) {
    const offset = (page - 1) * limit;

    // Construir condiciones dinámicas
    const condiciones = ["activo = TRUE"];
    const valores = [];
    let i = 1;

    if (titulo) {
      condiciones.push(`titulo ILIKE $${i}`);
      valores.push(`%${titulo}%`);
      i++;
    }

    if (id_categoria) {
      condiciones.push(`id_categoria = $${i}`);
      valores.push(id_categoria);
      i++;
    }

    const where = condiciones.length
      ? `WHERE ${condiciones.join(" AND ")}`
      : "";

    // Ejecutar ambas consultas en paralelo
    const [result, totalResult] = await Promise.all([
      pool.query(
        `SELECT id, id_categoria, titulo, descripcion, fecha_estreno, activo, fecha_creacion, fecha_actualizacion
        FROM peliculas
        ${where}
        ORDER BY fecha_estreno DESC
        LIMIT $${i} OFFSET $${i + 1}`,
        [...valores, limit, offset]
      ),
      pool.query(`SELECT COUNT(*) AS total FROM peliculas ${where}`, valores),
    ]);

    const total = parseInt(totalResult.rows[0].total, 10);
    return { peliculas: result.rows, total };
  }
}

module.exports = new PeliculaRepository();
