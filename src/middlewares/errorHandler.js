class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const mostrarError = (err, res) => {
  // Error operativo (confiable)
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
      data: null,
    });
  } else {
    // Error de programación (no mostrar al usuario)
    console.log("ERROR:", err)
    res.status(500).json({
      success: false,
      status: 500,
      message: "Error interno del servidor",
      data: null,
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  mostrarError(err, res);
};

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { CustomError, errorHandler, catchAsync };
