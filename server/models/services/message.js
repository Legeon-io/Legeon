import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  serviceDescription: {
    type: String,
  },

  price: { type: Number, required: true },
  slashPrice: { type: Number },
});

const messageModel = mongoose.model("service_message", messageSchema);

export default messageModel;
