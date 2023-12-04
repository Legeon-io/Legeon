import mongoose from "mongoose";

const accountBalanceSchema = new mongoose.Schema({
  userid: { type: String, unique: true, required: true },
  balance: { type: Number, required: true },
});

const accountBalanceModel = mongoose.model("balance", accountBalanceSchema);

export default accountBalanceModel;
