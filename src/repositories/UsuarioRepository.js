const pool = require("../database/database");

class UsuarioRepository {
  async crearUsuario({ nombre, correo, contrasena }) {
    const { rows } = await pool.query(
      `INSERT INTO usuarios(nombre, correo, contrasena) 
      VALUES ($1, $2, $3) RETURNING id, nombre, correo`,
      [nombre, correo, contrasena]
    );
    return rows[0];
  }

  async obtenerUsuarioPorEmail(correo) {
    const { rows } = await pool.query(
      `SELECT id, nombre, correo, contrasena 
      FROM usuarios WHERE correo = $1`,
      [correo]
    );
    return rows[0] || null;
  }

  async obtenerUsuarioPorId(id) {
    const { rows } = await pool.query(
      `SELECT id, nombre, correo, contrasena 
      FROM usuarios WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async obtenerUsuarios(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // Ejecutar consultas en paralelo
    const [usuariosResult, totalResult] = await Promise.all([
      pool.query(
        `SELECT u.id AS usuario_id, u.nombre, u.correo,
          json_agg(json_build_object(
            'id', p.id,
            'titulo', p.titulo,
            'fecha_estreno', p.fecha_estreno
          )) FILTER (WHERE p.id IS NOT NULL) AS peliculas_vistas
        FROM usuarios u
        LEFT JOIN peliculas_usuarios pu ON u.id = pu.id_usuario
        LEFT JOIN peliculas p ON pu.id_pelicula = p.id
        GROUP BY u.id
        ORDER BY u.nombre
        LIMIT $1 OFFSET $2;`,
        [limit, offset]
      ),
      pool.query("SELECT COUNT(*) AS total FROM usuarios")
    ]);

    const total = parseInt(totalResult.rows[0].total, 10);
    return { usuarios: usuariosResult.rows, total };
  }

  async marcarPelicula(id_usuario, { id_pelicula, calificacion = 1 }) {
    const { rows } = await pool.query(
      `INSERT INTO peliculas_usuarios(id_usuario, id_pelicula, calificacion) 
      VALUES ($1, $2, $3)
      ON CONFLICT (id_usuario, id_pelicula)
      DO UPDATE SET calificacion = EXCLUDED.calificacion
      RETURNING *`,
      [id_usuario, id_pelicula, calificacion]
    );

    return rows[0];
  }
}

module.exports = new UsuarioRepository();
