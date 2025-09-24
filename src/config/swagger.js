const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST peliculas",
      version: "1.0.0",
      description: "API REST para la gestión de usaurios y peliculas",
    },
    components: {
      schemas: {
        Categoria: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            nombre: {
              type: "string",
            },
            descripcion: {
              type: "string",
            },
            activo: {
              type: "boolean",
            },
            fecha_creacion: {
              type: "string",
              format: "date-time",
            },
            fecha_actualizacion: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            nombre: {
              type: "string",
            },
            correo: {
              type: "string",
              format: "email",
            },
            activo: {
              type: "boolean",
            },
            fecha_creacion: {
              type: "string",
              format: "date-time",
            },
            fecha_actualizacion: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Pelicula: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            id_categoria: {
              type: "string",
              format: "uuid",
            },
            titulo: {
              type: "string",
            },
            descripcion: {
              type: "string",
            },
            fecha_estreno: {
              type: "string",
              format: "date",
            },
            activo: {
              type: "boolean",
            },
            fecha_creacion: {
              type: "string",
              format: "date-time",
            },
            fecha_actualizacion: {
              type: "string",
              format: "date-time",
            },
          },
        },
        UsuarioInput: {
          type: "object",
          required: ["nombre", "correo", "contrasena"],
          properties: {
            nombre: {
              type: "string",
            },
            correo: {
              type: "string",
              format: "email",
            },
            contrasena: {
              type: "string",
            },
          },
        },
        PeliculaInput: {
          type: "object",
          required: ["id_categoria", "titulo", "fecha_estreno"],
          properties: {
            id_categoria: {
              type: "string",
              format: "uuid",
            },
            titulo: {
              type: "string",
            },
            descripcion: {
              type: "string",
            },
            fecha_estreno: {
              type: "string",
              format: "date",
            },
          },
        },
        PeliculaUsuarioInput: {
          type: "object",
          required: ["id_pelicula"],
          properties: {
            id_pelicula: {
              type: "string",
              format: "uuid",
            },
            calificacion: {
              type: "number",
              default: 1
            },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*.js"],
};

module.exports = swaggerJsdoc(options);
