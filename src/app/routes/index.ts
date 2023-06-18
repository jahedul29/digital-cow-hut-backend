import express, { Router } from 'express';
import { CowRouter } from '../modules/cow/cow.route';
import { OrderRouter } from '../modules/order/order.route';
import { UserRouter } from '../modules/user/user.route';

const appRouter = express.Router();

const routes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/cows',
    route: CowRouter,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
];

routes.forEach((el: { path: string; route: Router }) =>
  appRouter.use(el.path, el.route)
);

export default appRouter;
