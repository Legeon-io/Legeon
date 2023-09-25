import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
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
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema({
  events: [eventSchema],
});

const scheduleModel = mongoose.model("schedule", scheduleSchema);

export default scheduleModel;
