import { Response, Request, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/Product';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

export const getProducts = (
  _req: Request,
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
  const {
    title,
    image,
    category,
    description,
    price,
  } = req.body;
  Product.create({
    title,
    image,
    category,
    description,
    price,
  })
    .then((product) => res.status(201).send(product))
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      if (err instanceof Error && err.message.includes('E11000')) {
        return next(
          new ConflictError(
            'Название товара уже занято. Пожалуйста, придумайте другое название.',
          ),
        );
      }
      return next(err);
    });
};
