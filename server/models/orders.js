import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    mailId: { type: String, required: true },
    description: { type: String },
    // receiveMail: { type: Boolean, default: false },
  },
  { _id: false }
);

const rescheduleSchema = new mongoose.Schema(
  {
    date: { type: Date },
    fromTime: { type: Date },
    toTime: { type: Date },
    reason: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    serviceType: { type: String, required: true },
    dateOfBooking: { type: String, required: true }, // Date selected for service
    serviceId: { type: String, required: true },
    timeSlot: { type: Array, required: true },
    customer: { type: userSchema, required: true },
    isCanceled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    isRescheduled: { type: Boolean, default: false },
    rescheduled: { type: rescheduleSchema, default: null },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
