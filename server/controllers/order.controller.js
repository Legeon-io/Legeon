import orderModel from "../models/orders.js";
import messageModel from "../models/services/message.js";
import oneToOneModel from "../models/services/onetoonecall.js";
import scheduleModel from "../models/schedule.js";

// import { parse, format } from "date-fns";
// import { enIN } from "date-fns/locale";

// function getDayOfWeek(dateString) {
//   const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());
//   return format(parsedDate, "EEEE");
// }

export const placeServiceOrder = async (req, res) => {
  try {
    const data = req.body;
    const response = await orderModel.create(data);
    if (response) {
      return res.status(200).json({ message: "Order Placed Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// Booking API
async function checkServiceType(id, type) {
  if (type === "onetoone") {
    return await oneToOneModel.findOne(
      {
        _id: id,
      },
      {
        userid: 1,
        duration: 1,
      }
    );
  } else
    return await messageModel.findOne(
      {
        _id: id,
      },
      {
        userid: 1,
      }
    );
}

// res.json(getDayOfWeek("27-10-2023"));
export const showSlots = async (req, res) => {
  try {
    const { serviceId, serviceType, dayValue } = req.body;
    const { userid, duration } = await checkServiceType(serviceId, serviceType);
    const scheduleData = await scheduleModel.findOne(
      { _id: userid },
      { __v: 0 }
    );
    const orderData = await orderModel.findOne({ userid: userid }, { __v: 0 });
    // console.log(response);

    let slots = [];
    if (scheduleData.events[dayValue].selected) {
      scheduleData.events[dayValue].timeSlots.map((item) => {
        let startTime = item.fromTime.split(":");
        let endTime = item.toTime.split(":");
        console.log(startTime, endTime, duration);
        let totalStartTime = Number(startTime[0]) * 60 + Number(startTime[1]);
        let totalEndTime = Number(endTime[0]) * 60 + Number(endTime[1]);
        console.log(totalStartTime, totalEndTime);

        while (totalStartTime < totalEndTime) {
          let currentHour = Math.floor(totalStartTime / 60);
          let currentMins = totalStartTime % 60;

          totalStartTime = totalStartTime + duration;

          if (totalStartTime + duration >= totalEndTime) break;

          slots.push(`${currentHour}:${currentMins}`);
        }
      });
    }
    let orderSlots = [];
    if (orderData != null) {
      orderData.map((item) => {
        if (item.serviceType === "onetoone") {
          let time = item.datetime.split("T")[1];
          let hourMin = time.split(":");
          orderSlots.push(`${hourMin[0]}:${hourMin[1]}`);
        }
      });

      const filteredSlots = slots.filter((item) => !orderSlots.includes(item));
      return res.status(200).json(filteredSlots);
    }

    res.status(200).json(slots);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const id = req.user.id;

    const response = await orderModel.find({ userid: id });
    if (response.length > 0) {
      return res.status(200).json({ data: response });
    } else {
      return res.status(404).json({ message: "No Orders Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
