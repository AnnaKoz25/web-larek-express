import { Response, Request, NextFunction } from "express";
import Product from "../models/Product";
import { Error as MongooseError } from "mongoose";
import BadRequestError from "../errors/BadRequestError";
import ConflictError from "../errors/ConflictError";

export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Product.find({})
    .then((products) => res.send({ items: products, total: products.length }))
    .catch((err) => next(err));
};

export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, image, category, description, price } = req.body;
  Product.create({ title, image, category, description, price })
    .then((product) => res.status(201).send(product))
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(err.message));
      } else if (err instanceof Error && err.message.includes("E11000")) {
        return next(
          new ConflictError(
            "Название товара уже занято. Пожалуйста, придумайте другое название.",
          ),
        );
      } else {
        return next(err);
      }
    });
};
