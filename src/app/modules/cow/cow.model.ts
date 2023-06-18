import mongoose, { Schema, model } from 'mongoose';
import { cowBreeds, cowLabels, cowLocations } from './cow.constant';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: cowLocations,
      required: true,
    },
    breed: {
      type: String,
      enum: cowBreeds,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: cowLabels,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const Cow = model<ICow, CowModel>('Cow', cowSchema);

export default Cow;
