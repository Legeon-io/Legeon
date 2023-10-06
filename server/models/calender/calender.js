import mongoose from "mongoose";

const calendarEventSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  eventId: { type: String, required: true },
  summary: { type: String, required: true },
  description: { type: String, required: true },
});

const calenderEventModel = mongoose.model(
  "calender_event",
  calendarEventSchema
);

export default calenderEventModel;
