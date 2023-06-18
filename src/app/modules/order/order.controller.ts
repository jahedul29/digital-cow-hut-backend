/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/pagination/pagination.constant';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
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
    const paginationParams = pickQueryParams(req.query, paginationOptions);
    const savedOrder = await OrderService.getAllOrders(paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedOrder ? 'Orders retrieved successfully' : 'No Orders found',
      meta: savedOrder.meta,
      data: savedOrder.data,
    });
  }
);

const getSingleOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await OrderService.getSingleOrder(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: order ? 'Orders retrieved successfully' : 'No Orders found',
      data: order,
    });
  }
);

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
