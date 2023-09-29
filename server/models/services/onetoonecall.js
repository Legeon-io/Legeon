import mongoose from "mongoose";

const oneToOneSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: {
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
