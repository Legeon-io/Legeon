import oneToOneModel from "../../models/services/onetoonecall.js";

export const insertCall = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);

    // let data = req.body;
    // data.userid = id;
    // const response = await oneToOneModel.insertMany(data);
    // if (response) {
    //   return res.status(200).json({ message: "Created Call Successfully" });
    // }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateCall = async (req, res) => {
  try {
    const id = req.user.id;
    let { title, description, type, duration, price, slashPrice } = req.body;
    const response = await oneToOneModel.updateOne(
      { userid: id },
      {
        $set: {
          title: title,
          description: description,
          type: type,
          duration: duration,
          price: price,
          slashPrice: slashPrice,
        },
      }
    );
    if (response) {
      return res.status(200).json({ message: "Updated Call Successfully" });
    } else {
      return res.status(404).json({ message: "Cannot Call Service" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getCall = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await oneToOneModel.find({ userid: id });
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "No Calls Found" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const deleteCall = async (req, res) => {
  try {
    const id = req.body.id;
    await oneToOneModel.deleteOne({ _id: id });

    return res.status(200).json({ message: "Call Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
