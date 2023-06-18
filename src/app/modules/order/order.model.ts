import mongoose, { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    cow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
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

const Order = model<IOrder, OrderModel>('Order', orderSchema);

export default Order;
