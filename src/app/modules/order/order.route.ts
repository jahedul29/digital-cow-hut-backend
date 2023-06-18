import express from 'express';
import { validateRequestWithZod } from '../../middlewares/validateRequestWithZod.middleware';
import { OrderController } from './order.controller';
import { OrderValidationSchema } from './order.validate';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  validateRequestWithZod(OrderValidationSchema.createOrderZodValidateSchema),
  OrderController.createOrder
);
orderRouter.get('/', OrderController.getAllOrders);
orderRouter.get('/:id', OrderController.getSingleOrder);

export const OrderRouter = orderRouter;
