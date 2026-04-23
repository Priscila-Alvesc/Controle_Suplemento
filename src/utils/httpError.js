class HttpError extends Error {
  constructor(statusCode, error, details) {
    super(error);
    this.statusCode = statusCode;
    this.error = error;
    this.details = details;
  }
}

module.exports = { HttpError };
