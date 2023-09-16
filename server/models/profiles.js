import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profession: { type: String, required: true },
  introduction: { type: String, required: true },
  bio: { type: String },
});

const profileModel = mongoose.model("profile", profileSchema);

export default profileModel;
