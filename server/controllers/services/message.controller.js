import messageModel from "../../models/services/message.js";

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

export const getMessage = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await messageModel.find({ userid: id });
    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "No Messages Found" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const id = req.body.id;
    await messageModel.deleteOne({ _id: id });

    return res.status(200).json({ message: "Message Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
