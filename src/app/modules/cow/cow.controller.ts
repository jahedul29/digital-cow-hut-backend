/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/pagination/pagination.constant';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { cowFilterOptions } from './cow.constant';
import { CowService } from './cow.service';

const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const savedCow = await CowService.createCow(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cow saved successfully',
      data: savedCow,
    });
  }
);

const updateCow: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.body;

    const savedCow = await CowService.updateCow(user, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedCow ? 'Cow updated successfully' : 'Cow not found',
      data: savedCow,
    });
  }
);

const getAllCows: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, cowFilterOptions);

    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const savedCow = await CowService.getAllCows(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedCow ? 'Cows retrieved successfully' : 'No user found',
      meta: savedCow?.meta,
      data: savedCow.data,
    });
  }
);

const getSingleCow: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedCow = await CowService.getSingleCow(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedCow ? 'Cow retrieved successfully' : 'Cow not found',
      data: savedCow,
    });
  }
);

const deleteCow: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedCow = await CowService.deleteCow(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: deletedCow ? 'Cow deleted successfully' : 'Cow not found',
      data: deletedCow,
    });
  }
);

export const CowController = {
  createCow,
  updateCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
