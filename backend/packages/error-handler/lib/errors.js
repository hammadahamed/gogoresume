class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    this.name = this.constructor.name;
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation Error") {
    this.name = this.constructor.name;
    super(message, 400);
  }
}

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
};
