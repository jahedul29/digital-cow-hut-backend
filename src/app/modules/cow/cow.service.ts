import httpStatus from 'http-status';
import { ApiError } from '../../../shared/errors/errors.clsses';
import User from '../user/user.model';
import { ICow } from './cow.interface';
import Cow from './cow.model';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const isSellerExist = await User.findById(cow.seller);

  if (!isSellerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
  }

  const savedCow = await Cow.create(cow);
  return savedCow;
};

const updateCow = async (
  cow: Partial<ICow>,
  id: string
): Promise<ICow | null> => {
  if (cow.seller) {
    const isSellerExist = await Cow.findById(id);
    if (!isSellerExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
    }
  }

  const savedCow = await Cow.findOneAndUpdate({ _id: id }, cow, {
    new: true,
  });

  return savedCow;
};

const getAllCows = async () => {
  const cows = await Cow.find();
  return cows;
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const savedCow = await Cow.findById(id);
  return savedCow;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const savedCow = await Cow.findByIdAndDelete(id);
  return savedCow;
};

export const CowService = {
  createCow,
  updateCow,
  getAllCows,
  getSingleCow,
  deleteCow,
};
