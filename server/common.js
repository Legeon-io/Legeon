import messageModel from "./models/services/message.js";
import oneToOneModel from "./models/services/onetoonecall.js";

import nodemailer from "nodemailer";

export async function getServiceInfo(serviceId, serviceType) {
  switch (serviceType) {
    case "onetoone":
      return oneToOneModel.findOne({ _id: serviceId }, { _id: 0 }).lean();
    case "message":
      return messageModel.findOne({ _id: serviceId }, { _id: 0 }).lean();
  }
}

// Nodemailer Function
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  // secure: true,
  auth: {
    user: "legeon.connect@gmail.com",
    pass: "ntlneorttlfgrxda",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
