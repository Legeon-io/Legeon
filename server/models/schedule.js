import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    day: { type: String },
    selected: { type: Boolean },
    timeSlots: [
      {
        fromTime: { type: String },
        toTime: { type: String },
      },
    ],
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema({
  no_of_week: { type: Number },
  events: [eventSchema],
  active: { type: Boolean },
});

const scheduleModel = mongoose.model("schedule", scheduleSchema);

export default scheduleModel;
