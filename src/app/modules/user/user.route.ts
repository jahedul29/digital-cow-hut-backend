import express from 'express';
import { validateRequestWithZod } from '../../middlewares/validateRequestWithZod.middleware';
import { UserController } from './user.controller';
import { UserValidationSchema } from './user.validate';

const userRouter = express.Router();

userRouter.patch(
  '/:id',
  validateRequestWithZod(UserValidationSchema.updateZodValidateSchema),
  UserController.updateUser
);
userRouter.get('/:id', UserController.getSingleUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.post(
  '/create-user',
  validateRequestWithZod(UserValidationSchema.createUserZodValidateSchema),
  UserController.createUser
);

export const UserRouter = userRouter;
