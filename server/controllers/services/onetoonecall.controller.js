import oneToOneModel from "../../models/services/onetoonecall.js";

export const insertCall = async (req, res) => {
  try {
    const id = req.user.id;

    let data = req.body;
    data.userid = id;

    const response = await oneToOneModel.create(data);
    if (response) {
      return res.status(200).json({ message: "Created Call Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateCall = async (req, res) => {
  try {
    let {
      serviceTitle,
      serviceDescription,
      serviceType,
      duration,
      price,
      slashPrice,
      serviceId,
    } = req.body;
    const response = await oneToOneModel.updateOne(
      { _id: serviceId },
      {
        $set: {
          serviceTitle: serviceTitle,
          serviceDescription: serviceDescription,
          serviceType: serviceType,
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

export const deleteCall = async (req, res) => {
  try {
    const { serviceId } = req.body;
    await oneToOneModel.deleteOne({ _id: serviceId });

    return res.status(200).json({ message: "Call Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
