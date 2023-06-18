import { Model } from 'mongoose';

export type IUserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: IUserName;
  address: string;
  budget: number;
  income: number;
};

export type IUserMethods = object;

export type UserModel = Model<IUser, object, IUserMethods>;

// export type IAcademicDepartmentFilters = {
//   searchTerm?: string;
//   title?: string;
//   academicFaculty?: string;
// };
