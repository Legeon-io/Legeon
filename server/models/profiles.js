import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  profession: { type: String },
  introduction: { type: String },
  bio: {
    type: String,
  },
  mobile: {
    type: Number,
    default: null,
  },
});

const profileModel = mongoose.model("profile", profileSchema);

export default profileModel;
