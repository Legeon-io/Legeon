import messageModel from "./models/services/message.js";
import oneToOneModel from "./models/services/onetoonecall.js";

export async function getServiceInfo(serviceId, serviceType) {
  switch (serviceType) {
    case "onetoone":
      return oneToOneModel.findOne({ _id: serviceId }, { _id: 0 }).lean();
    case "message":
      return messageModel.findOne({ _id: serviceId }, { _id: 0 }).lean();
  }
}
