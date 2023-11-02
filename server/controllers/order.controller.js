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
export const generateSlots = async (req, res) => {
  try {
    const { serviceId, serviceType, date, dayValue } = req.body;
    const { userid, duration } = await checkServiceType(serviceId, serviceType);
    const scheduleData = await scheduleModel.findOne(
      { _id: "6541171b3ede7f542cd783da" },
      { __v: 0, _id: 0 }
    );

    const value = scheduleData.events[0].selected
      ? scheduleData.events[0].timeSlots
      : null;

    let availability = [];
    if (value != null) availability = convertToMinutes(value);

    const inputDate = new Date(date); //"11-05-2023"
    const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0)); // Set time to the start of the day (00:00:00)
    const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999)); // Set time to the end of the day (23:59:59)

    // check orderData Output
    const orderData = await orderModel.findOne(
      {
        $and: [
          { userid: userid },
          { datetime: { $gte: startOfDay, $lte: endOfDay } },
        ],
      },
      { __v: 0, timeSlot: 1 }
    );
    // End of Data Collection

    // orderData must be refined like [[300,360],[600,660],..]
    // assuming
    for (let item of orderData) {
      availability = generateAvailability(item[0], item[1], availability);
    }

    let final_slots = generateAvailableSlots(duration, availability);
    res.status(200).json(final_slots);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

function generateAvailability(startTime, endTime, availability) {
  let new_availability = [];
  for (let slot of availability) {
    if (slot[1] < startTime || slot[0] > endTime) {
      new_availability.push(slot[0], slot[1]);
    } else if (slot[0] < startTime && slot[1] > endTime) {
      new_availability.push(slot[0], startTime);
      new_availability.push(endTime, slot[1]);
    } else if (slot[1] > endTime) {
      new_availability.push(endTime, slot[1]);
    } else if (slot[0] < startTime) {
      new_availability.push(slot[0], startTime);
    }
  }
  return new_availability;
}

function generateAvailableSlots(duration, availability) {
  let final_slots = [];
  for (let slot of availability) {
    let startTime = slot[0];
    let endTime = slot[1];
    while (startTime + duration < endTime) {
      convertedTime = convertToHours(startTime + duration);
      final_slots.push(`${Math.floor(startTime / 60)}:${startTime % 60}`);
      startTime = startTime + duration;
    }
  }
  return final_slots;
}

function convertToMinutes(arr) {
  const resultArray = arr.map((item) => {
    const fromTime = item.fromTime.split(":");
    const toTime = item.toTime.split(":");

    const fromMinutes = parseInt(fromTime[0]) * 60 + parseInt(fromTime[1]);
    const toMinutes = parseInt(toTime[0]) * 60 + parseInt(toTime[1]);

    return [fromMinutes, toMinutes];
  });
  return resultArray;
}

// End of Slot Generation

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
