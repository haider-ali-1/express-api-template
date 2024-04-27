const globalErrorHandler = (err, req, res, next) => {
  console.log(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errors = Object.values(err.errors).map((error) => {
      return { message: error.message, path: error.path };
    });
  }

  if (err.code && err.code === 11000) {
    statusCode = 409;
    message = `${Object.keys(err.keyValue)[0]} already exists`;
  }

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Invalid ID";
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  res.status(statusCode).json({ statusCode, message, errors });
};
export { globalErrorHandler };
