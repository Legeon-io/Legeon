// import user from "../models/users.js";
// import googleUser from "../models/googleuser.js";
import schedule from "../models/schedule.js";

export const updateEvents = async (req, res) => {
  try {
    const id = req.user.id;
    // check at frontend
    const data = req.body.data;
    await schedule.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          available: data,
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

export const getEvents = async (req, res) => {
  try {
    const id = req.user.id;
    // const username = req.user.username;
    const response = await schedule.findOne(
      { _id: id },
      // { username },
      { _id: 0 }
    );
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
