import express from 'express';
import { validateRequestWithZod } from '../../middlewares/validateRequestWithZod.middleware';
import { CowController } from './cow.controller';
import { CowValidationSchema } from './cow.validate';

const cowRouter = express.Router();

cowRouter.post(
  '/',
  validateRequestWithZod(CowValidationSchema.createCowZodValidateSchema),
  CowController.createCow
);
cowRouter.get('/', CowController.getAllCows);
cowRouter.patch(
  '/:id',
  validateRequestWithZod(CowValidationSchema.updateCowZodValidateSchema),
  CowController.updateCow
);
cowRouter.get('/:id', CowController.getSingleCow);
cowRouter.delete('/:id', CowController.deleteCow);

export const CowRouter = cowRouter;
