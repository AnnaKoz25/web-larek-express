import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import orderSchema from '../validations/orderSchema';
import createOrder from '../controllers/order';

const routerOrder = Router();

routerOrder.post('/', celebrate({ [Segments.BODY]: orderSchema }), createOrder);

export default routerOrder;
