import { ErrorRequestHandler } from 'express';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';
import InternalServerError from '../errors/InternalServerError';
import NotFoundError from '../errors/NotFoundError';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (
    err instanceof BadRequestError
    || err instanceof NotFoundError
    || err instanceof ConflictError
    || err instanceof InternalServerError
  ) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({ message: 'неизвестная ошибка сервера' });
};

export default errorHandler;
