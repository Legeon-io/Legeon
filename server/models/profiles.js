import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  profession: { type: String, required: true },
  introduction: { type: String, required: true },
  bio: {
    type: String,
    default:
      "Tell your audience about your experience that makes people Engage with you",
  },
});

const profileModel = mongoose.model("profile", profileSchema);

export default profileModel;
