import messageModel from "../../models/services/message.js";

/**POST : /api/services/message */
export const insertMessage = async (req, res) => {
  try {
    const id = req.user.id;

    let data = req.body;
    data.userid = id;
    const response = await messageModel.create(data);
    if (response) {
      return res.status(200).json({ message: "Created Message Successfully" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

/** PUT: /api/services/message */
export const updateMessage = async (req, res) => {
  try {
    let { serviceTitle, serviceDescription, price, slashPrice, serviceId } =
      req.body;
    const response = await messageModel.updateOne(
      { _id: serviceId },
      {
        $set: {
          serviceTitle: serviceTitle,
          serviceDescription: serviceDescription,
          price: price,
          slashPrice: slashPrice,
        },
      }
    );
    if (response) {
      return res.status(200).json({ message: "Updated Message Successfully" });
    } else {
      return res.status(404).json({ message: "Cannot Update Message" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

/** POST :  /api/services/message/delete */
export const deleteMessage = async (req, res) => {
  try {
    const { serviceId } = req.body;
    await messageModel.deleteOne({ _id: serviceId });

    return res.status(200).json({ message: "Message Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
