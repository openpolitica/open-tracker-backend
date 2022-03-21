class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.httpStatusCode = statusCode;
  }
}

module.exports = ApiError;
