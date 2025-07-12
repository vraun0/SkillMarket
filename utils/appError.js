class AppError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

module.exports = AppError;

