/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = req.body;

    const savedOrder = await OrderService.createOrder(order);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order placed successfully',
      data: savedOrder,
    });
  }
);
const getAllOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedOrder = await OrderService.getAllOrders();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedOrder ? 'Orders retrieved successfully' : 'No user found',
      data: savedOrder,
    });
  }
);

export const OrderController = {
  createOrder,
  getAllOrders,
};
