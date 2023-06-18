import { Model } from 'mongoose';

export type ICow = {
  phoneNumber: string;
};

export type ICowMethods = object;

export type AcademicDepartmentModel = Model<ICow, object, ICowMethods>;

// export type IAcademicDepartmentFilters = {
//   searchTerm?: string;
//   title?: string;
//   academicFaculty?: string;
// };
