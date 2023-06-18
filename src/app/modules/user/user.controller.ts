/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const savedUser = await UserService.createUser(user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User saved successfully',
      data: savedUser,
    });
  }
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.body;

    const savedUser = await UserService.updateUser(user, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedUser ? 'User updated successfully' : 'User not found',
      data: savedUser,
    });
  }
);

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedUser = await UserService.getSingleUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: savedUser ? 'User retrieved successfully' : 'User not found',
      data: savedUser,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedUser = await UserService.deleteUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: deletedUser ? 'User deleted successfully' : 'User not found',
      data: deletedUser,
    });
  }
);

export const UserController = {
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
