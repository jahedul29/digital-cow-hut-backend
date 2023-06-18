import httpStatus from 'http-status';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  user.budget = user.budget ?? 0;
  user.income = user.income ?? 0;
  const savedUser = await User.create(user);
  return savedUser;
};

const updateUser = async (
  user: Partial<IUser>,
  id: string
): Promise<IUser | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { name, ...userData } = user;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const savedUser = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });

  return savedUser;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const savedUser = await User.findById(id);
  return savedUser;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const savedUser = await User.findByIdAndDelete(id);
  return savedUser;
};

export const UserService = {
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
