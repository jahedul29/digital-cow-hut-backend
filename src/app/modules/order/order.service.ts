import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { ApiError } from '../../../shared/errors/errors.clsses';
import Cow from '../cow/cow.model';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const cow = await Cow.findById(order.cow);
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found');
  }

  const buyer = await User.findById(order.buyer);
  if (!buyer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
  }

  if (buyer.budget < cow.price) {
    throw new ApiError(
      httpStatus.PAYMENT_REQUIRED,
      `buyer don't have enough balance to but this cow`
    );
  }

  let finalOrder = null;

  const session = await mongoose.startSession();
  try {
    (await session).startTransaction();

    const seller = await User.findById(cow.seller).session(session);

    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
    }

    cow.label = 'sold out';

    buyer.budget = buyer.budget - cow.price;
    seller.income = seller.income + cow.price;

    await seller.save({ session: session });
    await buyer.save({ session: session });

    const savedOrder = await Order.create([order], { session: session });

    if (savedOrder.length > 0) {
      finalOrder = savedOrder[0];
    } else {
      finalOrder = null;
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (finalOrder) {
    finalOrder = await Order.findById(finalOrder._id)
      .populate('buyer')
      .populate('cow');
  }

  return finalOrder;
};

const getAllOrders = async () => {
  const users = await Order.find();
  return users;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
