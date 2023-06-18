/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
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
    const savedCow = await CowService.getAllCows();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedCow ? 'Cows retrieved successfully' : 'No user found',
      data: savedCow,
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
