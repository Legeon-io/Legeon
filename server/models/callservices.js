import mongoose from "mongoose";

const CallServicesSchema = new mongoose.Schema({
  username: { type: String, required: true },
  servicetype: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number },
});

const callServicesModel = mongoose.model("CallServices", CallServicesSchema);

export default callServicesModel;