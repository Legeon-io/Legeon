import mongoose from "mongoose";
import schedule from "../models/schedule.js";

// PUT -> api/events/updateevents
export const updateEvents = async (req, res) => {
  try {
    const { id } = req.user;
    const { data } = req.body;
    let scheduleData = await schedule.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    // Create a new document if it doesn't exist
    if (!scheduleData)
      scheduleData = new schedule({ _id: mongoose.Types.ObjectId(id) });

    // Update the fields
    scheduleData.events = data;

    // Save the document
    await scheduleData.save();

    res.status(200).json({ message: "Successfully Updated The Events" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// PUT -> api/events/setweeks
export const setWeek = async (req, res) => {
  try {
    const { id } = req.user;
    // change req.body according to frontend
    const { no_of_week } = req.body;

    let scheduleData = await schedule.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    // Create a new document if it doesn't exist
    if (!scheduleData)
      scheduleData = new schedule({ _id: mongoose.Types.ObjectId(id) });

    // Update the fields
    scheduleData.no_of_week = no_of_week;

    // Save the document
    await scheduleData.save();

    res.status(200).json({ message: "Successfully Updated Number of Weeks" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// GET -> api/events/getevents
export const getEvents = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await schedule.findOne({ _id: id }, { _id: 0, __v: 0 });
    if (response) res.status(200).json(response);
    else res.status(404).json({ message: "No Events Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
