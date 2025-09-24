require("dotenv").config();
const { Pool } = require("pg");

// Crear pool de conexiones
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  max: 10, // Máximo de conexiones simultáneas
  idleTimeoutMillis: 10000, // Tiempo de inactividad antes de cerrar conexión
  connectionTimeoutMillis: 2000, // Tiempo máximo para obtener una conexión
});

// Probar conexión inicial
(async () => {
  try {
    const client = await pool.connect();
    console.log("Conectado a PostgreSQL");
    client.release(); // Liberar conexión
  } catch (err) {
    console.error("Error de conexión:", err);
  }
})();

module.exports = pool;
