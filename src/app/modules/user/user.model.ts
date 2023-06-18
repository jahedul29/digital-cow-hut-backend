import { Schema, model } from 'mongoose';
import { userRoles } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: userRoles,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// academicDepartmentSchema.pre('save', async function (next) {
//   const isExist = await AcademicDepartment.findOne({
//     title: { $regex: new RegExp('^' + this.title + '$', 'i') },
//     academicFaculty: this.academicFaculty,
//   });
//   if (isExist) {
//     throw new ApiError(
//       httpStatus.CONFLICT,
//       'This department under this specific faculty exist!'
//     );
//   }
//   next();
// });

const User = model<IUser, UserModel>('User', userSchema);

export default User;
