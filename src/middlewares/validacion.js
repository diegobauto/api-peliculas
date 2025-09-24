const Joi = require("joi");
const { CustomError } = require("./errorHandler");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new CustomError(errorMessage, 400));
    }
    next();
  };
};

const schemas = {
  crearUsuario: Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
      "string.empty": "El nombre de usuario es obligatorio",
      "string.min": "El nombre debe tener al menos 2 caracteres",
      "string.max": "El nombre no puede exceder los 100 caracteres",
      "any.required": "El nombre es obligatorio",
    }),
    correo: Joi.string().email().required().messages({
      "string.email": "Ingresa un correo electrónico válido",
      "any.required": "El correo electrónico es obligatorio",
    }),
    contrasena: Joi.string().required().messages({
      "string.empty": "La contraseña es obligatoria",
      "any.required": "La contraseña es obligatoria",
    }),
    activo: Joi.boolean().default(true),
  }),

  crearPelicula: Joi.object({
    id_categoria: Joi.string().uuid().required().messages({
      "string.empty": "La categoria es obligatoria",
      "string.guid": "El ID de categoría debe ser un GUID válido",
    }),
    titulo: Joi.string().min(3).max(200).required().messages({
      "string.empty": "El título de la película es obligatorio",
      "string.min": "El título debe tener al menos 3 caracteres",
      "string.max": "El título no puede exceder los 200 caracteres",
      "any.required": "El título de la película es obligatorio",
    }),
    descripcion: Joi.string().min(2).max(100).optional().allow(null),
    fecha_estreno: Joi.date().iso().required().messages({
      "date.base": "La fecha de estreno debe ser una fecha válida",
      "date.format": "La fecha de estreno debe estar en formato (AAAA-MM-DD)",
      "date.iso": "La fecha de estreno debe estar en formato (AAAA-MM-DD)",
      "any.required": "La fecha de estreno es obligatoria",
    }),
    activo: Joi.boolean().default(true),
  }),

  asignarPelicula: Joi.object({
    id_pelicula: Joi.string().uuid().required().messages({
      "string.guid": "El ID de la película debe ser un UUID válido",
      "any.required": "El ID de la película es obligatorio",
    }),
    calificacion: Joi.number().integer().min(1).max(5).optional().messages({
      "number.min": "La calificación debe debe estar entre 1 y 5",
      "number.max": "La calificación debe debe estar entre 1 y 5",
    }),
    activo: Joi.boolean().default(true),
  }),
};

module.exports = { validate, schemas };
