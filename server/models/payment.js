import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  orderId: { type: String, unique: true, required: true },
  paymentIntent: { type: String, required: true },
});

const paymentModel = mongoose.model("payment", paymentSchema);

export default paymentModel;
