import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/NotFoundError';

const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('страница не найдена'));
};

export default notFound;
