import mongoose from "mongoose";

const googleSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
});

const googleUser = mongoose.model("GoogleUser", googleSchema);

export default googleUser;
