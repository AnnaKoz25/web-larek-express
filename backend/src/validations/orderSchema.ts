import Joi from 'joi';

const orderSchema = Joi.object({
  items: Joi.array().min(1).items(Joi.string().hex().length(24)).required(),
  total: Joi.number().required(),
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

export default orderSchema;
