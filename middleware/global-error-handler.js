import { generateCustomErrorStack } from '../utils/custom-error-stack.js';

// error will caught here first
const errorHandlerMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || 'error';
  let errorMessage = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    statusCode = 400;
    errorMessage = `Invalid Id ${err.value}`;
  }
  //
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join('. ');
  }
  //
  else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already taken please try another`;
  }

  // main error response
  const errorResponse = { status, message: errorMessage };

  // only for development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.customStack = generateCustomErrorStack(err.stack);
    errorResponse.stack = err.stack;
    errorResponse.error = err;
  }

  res.status(statusCode).json(errorResponse);
};

export { errorHandlerMiddleware };
