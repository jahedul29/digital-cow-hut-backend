import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { IPaginationOptions } from '../../../shared/pagination/pagination.interface';
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

const getAllOrders = async (
  // filters: ICowFilters,
  paginationParams: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.generatePaginationAndSortFields(paginationParams);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // const { searchTerm, ...filterData } = filters;
  // const andConditions = [];
  // let filterConditions = {};
  // const searchableFields: string[] = cowSearchableFields;

  // if (searchTerm) {
  //   andConditions.push({
  //     $or: searchableFields.map((field: string) => {
  //       return {
  //         [field]: {
  //           $regex: new RegExp(searchTerm, 'i'),
  //         },
  //       };
  //     }),
  //   });

  //   filterConditions = { $and: andConditions };
  // }

  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     $and: Object.entries(filterData).map(([field, value]) => {
  //       if (field === 'maxPrice' && value) {
  //         return { price: { $lte: parseFloat(value) } };
  //       } else if (field === 'minPrice' && value) {
  //         return { price: { $gte: parseFloat(value) } };
  //       } else {
  //         return { [field]: value };
  //       }
  //     }),
  //   });

  //   filterConditions = { $and: andConditions };
  // }

  const orders = await Order.find()
    .populate('buyer')
    .populate('cow')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  return {
    data: orders,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getSingleOrder = async (id: string) => {
  const orders = await Order.findById(id).populate('buyer').populate('cow');
  return orders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
