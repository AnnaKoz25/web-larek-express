import { model, Schema } from "mongoose";

interface IProductImage {
  fileName: string;
  originalName: string;
}

export interface IProduct {
  title: string;
  image: IProductImage;
  category: string;
  description?: string | undefined;
  price?: number | null;
}

const productImageSchema = new Schema<IProductImage>(
  {
    fileName: {
      type: String,
      required: [true, "нет fileName для изображения"],
    },
    originalName: {
      type: String,
      required: [true, "нет originalName для изображения"],
    },
  },
  { _id: false },
);

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    unique: true,
    required: [true, "Поле title должно быть заполнено"],
    minlength: [2, "минимальная длина поля title - 2"],
    maxlength: [30, "максимальная длина поля title - 30"],
  },
  image: {
    type: productImageSchema,
    required: [true, "объект изображения должен существовать"],
  },
  category: {
    type: String,
    required: [true, "поле category должно быть заполнено"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default model<IProduct>("product", productSchema);
