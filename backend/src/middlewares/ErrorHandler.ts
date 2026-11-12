import BadRequestError from "../errors/BadRequestError";
import ConflictError from "../errors/ConflictError";
import InternalServerError from "../errors/InternalServerError";
import NotFoundError from "../errors/NotFoundError";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (
    err instanceof BadRequestError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError ||
    err instanceof InternalServerError
  ) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  res.status(500).send({ message: "неизвестная ошибка сервера" });
};
