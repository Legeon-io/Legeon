import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  key: { type: String, required: true },
  title: { type: String, required: true },
  description: {
    type: String,
  },

  price: { type: Number, required: true },
  slashPrice: { type: Number },
});

const messageModel = mongoose.model("service_message", messageSchema);

export default messageModel;
