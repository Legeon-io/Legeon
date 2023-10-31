import mongoose from "mongoose";

const oneToOneSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    serviceType: { type: String, required: true },
    serviceDescription: {
      type: String,
    },
    timeSlot: { type: String, required: true }, // early morning, morning, noon, evevening, night, late night
    duration: {
      type: Number,
      required: true,
    },
    price: { type: Number, required: true },
    slashPrice: { type: Number },
  },
  { timestamps: true }
);

const oneToOneModel = mongoose.model("service_onetoonecall", oneToOneSchema);

export default oneToOneModel;
