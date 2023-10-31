import mongoose from "mongoose";

const linkDetails = new mongoose.Schema(
  {
    href: String,
    id: String,
  },
  {
    _id: false,
  }
);
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
  link: [linkDetails],
  language: [String],
});

const profileModel = mongoose.model("profile", profileSchema);

export default profileModel;
