import { NotFoundError } from '../utils/custom-errors.js';

const notFoundMiddleware = (req, res, next) => {
  const error = new NotFoundError(
    `cannot find route ${req.originalUrl} on the server`
  );
  next(error);
};

export { notFoundMiddleware };
