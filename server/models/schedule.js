import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  day: { type: String },
  selected: { type: Boolean },
  timeSlots: [
    {
      fromTime: { type: String },
      fromPeriod: { type: String },
      toTime: { type: String },
      toPeriod: { type: String },
    },
  ],
});

const scheduleSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  events: [eventSchema],
});

const scheduleModel = mongoose.model("schedule", scheduleSchema);

export default scheduleModel;
