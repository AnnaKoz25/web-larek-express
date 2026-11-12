import NotFoundError from "../errors/NotFoundError";
import { NextFunction, Request, Response } from "express";

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("страница не найдена"));
};
