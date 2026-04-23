const { HttpError } = require("../utils/httpError");

function notFoundHandler(req, res) {
  return res.status(404).json({
    error: "Rota nao encontrada.",
  });
}

function errorHandler(error, req, res, next) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      error: error.error,
      ...(error.details ? { details: error.details } : {}),
    });
  }

  console.error(error);

  return res.status(503).json({
    error: "Servico temporariamente indisponivel.",
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
