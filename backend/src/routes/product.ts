import { celebrate, Segments } from "celebrate";
import { createProduct, getProducts } from "../controllers/products";
import { Router } from "express";
import { productSchema } from "../validations/productSchema";

const routerProducts = Router();

routerProducts.get("/", getProducts);
routerProducts.post(
  "/",
  celebrate({ [Segments.BODY]: productSchema }),
  createProduct,
);

export default routerProducts;
