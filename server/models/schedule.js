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
  no_of_week: { type: Number, default: 1 },
  events: [eventSchema],
  isActive: { type: Boolean, default: true },
});

const scheduleModel = mongoose.model("schedule", scheduleSchema);

export default scheduleModel;
