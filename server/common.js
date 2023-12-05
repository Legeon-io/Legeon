import googleuser from "./models/googleUser.js";
import messageModel from "./models/services/message.js";
import oneToOneModel from "./models/services/onetoonecall.js";

import nodemailer from "nodemailer";
import user from "./models/users.js";

export async function getServiceInfo(serviceId, serviceType) {
  switch (serviceType) {
    case "onetoone":
      return oneToOneModel.findOne({ _id: serviceId }, { _id: 0 }).lean();
    case "message":
      return messageModel.findOne({ _id: serviceId }, { _id: 0 }).lean();
  }
}

// Get User Info
export async function getUserInfo(userid) {
  let response;
  response = await googleuser.findOne({ _id: userid });
  if (response) return response;
  response = await user.findOne({ _id: userid });
  if (response) return response;
  else return null;
}

// Nodemailer Function
export const transporter = nodemailer.createTransport({
  from: "legeon.connect@gmail.com",
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
