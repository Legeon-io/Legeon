import mongoose from "mongoose";

const GoogleSchema = new mongoose.Schema({
  //   username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
