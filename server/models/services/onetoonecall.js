import mongoose from "mongoose";

const oneToOneSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  serviceType: { type: String, required: true },
  serviceDescription: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: { type: Number, required: true },
  slashPrice: { type: Number },
});

const oneToOneModel = mongoose.model("service_onetoonecall", oneToOneSchema);

export default oneToOneModel;
