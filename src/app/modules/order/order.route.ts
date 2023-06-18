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

export const OrderRouter = orderRouter;
