import BadRequestError from "../errors/BadRequestError";
import { Response, Request, NextFunction } from "express";
import Product from "../models/Product";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productsFromOrder = await Product.find({
      _id: { $in: req.body.items },
    });
    if (productsFromOrder.length !== req.body.items.length) {
      return next(new BadRequestError("Товара не существует"));
    }

    const priceIsNull = productsFromOrder.some(
      (product) => product.price === null,
    );

    if (priceIsNull) {
      return next(new BadRequestError("Товар не продается"));
    }

    const productsTotal = productsFromOrder.reduce(
      (sum, product) => sum + (product.price as number),
      0,
    );

    if (req.body.total === productsTotal) {
      res.send({ id: crypto.randomUUID(), total: productsTotal });
    } else {
      return next(
        new BadRequestError("Произошла ошибка при подсчете суммы заказа"),
      );
    }
  } catch (err) {
    next(err);
  }
};
