import Joi from 'joi';

const productSchema = Joi.object({
  title: Joi.string().required().min(2).max(30),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().allow(null),
});

export default productSchema;
