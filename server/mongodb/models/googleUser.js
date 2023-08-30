import mongoose from "mongoose";

const GoogleSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
});

const googleuser = mongoose.model("GoogleUser", GoogleSchema);

export default googleuser;
