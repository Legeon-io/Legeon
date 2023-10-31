import mongoose from "mongoose";
import schedule from "../models/schedule.js";

export const updateEvents = async (req, res) => {
  try {
    const id = req.user.id;
    const data = req.body.data;
    await schedule.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          events: data,
        },
      },
      { upsert: true }
    );
    res.status(200).json({ message: "Successfully Updated The Events" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const setWeek = async (req, res) => {
  try {
    const id = req.user.id;
    // change req.body according to frontend
    const data = req.body.data;
    await schedule.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          no_of_week: data,
        },
      },
      { upsert: true }
    );
    res.status(200).json({ message: "Successfully Updated Number of Weeks" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
export const getEvents = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await schedule.findOne({ _id: id }, { _id: 0 });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No Events Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};