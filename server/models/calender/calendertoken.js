import mongoose from "mongoose";

const calendarTokenSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  scope: { type: String, required: true },
  token_type: { type: String, required: true },
  expiry_date: { type: Number, required: true },
});

const calenderTokenModel = mongoose.model(
  "calender_token",
  calendarTokenSchema
);

export default calenderTokenModel;
