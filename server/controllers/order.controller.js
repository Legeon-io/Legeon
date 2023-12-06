import orderModel from "../models/orders.js";
import scheduleModel from "../models/schedule.js";

// Google Calender Dependencies
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import calenderTokenModel from "../models/calender/calendertoken.js";
import { getServiceInfo, getUserInfo } from "../common.js";
import { sendMail } from "../utils/mailer.js";

const CLIENT_ID =
  "762015424404-a8lg6tnfh8dma5vps7dkaj63d4j0t7b3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

const REDIRECT_URI = "http://localhost:8080/api/calender/auth/google/callback";

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const calendar = google.calendar({ version: "v3" });

// import { parse, format } from "date-fns";
// import { enIN } from "date-fns/locale";

// function getDayOfWeek(dateString) {
//   const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());
//   return format(parsedDate, "EEEE");
// }

// POST -> /api/order
export const placeServiceOrder = async (req, res, next) => {
  try {
    const { data } = req.app;
    const userData = await getUserInfo(data.userid);
    // Google Calendar Response
    let googleResponse;

    const response = await orderModel.create(data);
    req.app.orderId = response._id;

    const serviceInfo = await getServiceInfo(data.serviceId, data.serviceType);

    const getCalenderToken = await calenderTokenModel.findOne(
      { userid: data.userid },
      { _id: 0, userid: 0, __v: 0 }
    );

    if (getCalenderToken && data.serviceType == "onetoone") {
      oauth2Client.setCredentials(getCalenderToken);

      const attendeesEmails = [{ email: data.customer.mailId }];

      const event = {
        summary: serviceInfo.serviceTitle,
        description: serviceInfo.serviceDescription,
        start: {
          dateTime: `${data.dateOfBooking}T${data.timeSlot.fromTime}:00`, // "2023-11-05T10:00:00"
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: `${data.dateOfBooking}T${data.timeSlot.toTime}:00`, // "2023-11-05T10:00:00"
          timeZone: "Asia/Kolkata",
        },

        attendees: attendeesEmails,
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
            requestId: req.app.orderId,
          },
        },
      };

      await calendar.events.insert(
        {
          calendarId: "primary",
          resource: event,
          auth: oauth2Client,
          conferenceDataVersion: 1,
        },
        async (err, res) => {
          if (err) {
            console.error("Error creating event:", err);
            return;
          } else {
            await orderModel.findOneAndUpdate(
              { _id: req.app.orderId },
              {
                $set: {
                  "moreInfo.isInfoPresent": true,
                  "moreInfo.start": res.data.start,
                  "moreInfo.end": res.data.end,
                  "moreInfo.openCalendarLink": res.data.htmlLink,
                  "moreInfo.gMeetLink": res.data.hangoutLink,
                  "moreInfo.gMeetCode": res.data.conferenceData.conferenceId,
                  "moreInfo.calendarId": res.data.id,
                },
              }
            );
          }
          sendMail(
            data.serviceType,
            serviceInfo,
            data,
            req,
            res,
            response,
            userData
          );
        }
      );
    } else if (data.serviceType == "message")
      sendMail(
        data.serviceType,
        serviceInfo,
        data,
        req,
        googleResponse,
        response,
        userData
      );

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const generateSlots = async (req, res) => {
  try {
    const { serviceId, serviceType, date, dayValue } = req.body;
    const { userid, duration } = await getServiceInfo(serviceId, serviceType);
    const scheduleData = await scheduleModel.findOne(
      { _id: userid },
      { __v: 0, _id: 0 }
    );

    const value = scheduleData.events[dayValue].selected
      ? scheduleData.events[dayValue].timeSlots
      : null;

    if (!value) return res.status(400).json({ error: "Slots Not Available" });

    let availability = [];
    if (value != null) availability = convertToMinutes(value);

    const inputDate = new Date(date); //"11-05-2023"
    const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0)); // Set time to the start of the day (00:00:00)
    const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999)); // Set time to the end of the day (23:59:59)

    // check orderData Output
    const orderData = await orderModel.find(
      {
        $and: [
          { userid: userid },
          { dateOfBooking: { $gte: startOfDay, $lte: endOfDay } },
        ],
      },
      { timeSlot: 1 }
    );
    // End of Data Collection

    // orderData must be refined like [[300,360],[600,660],..]
    // assuming
    // console.log(orderData);

    if (orderData) {
      let slots = [];
      orderData.map((item) => {
        slots.push(item.timeSlot);
      });
      slots = convertToMinutes(slots);
      for (let item of slots) {
        availability = generateAvailability(item[0], item[1], availability);
      }
    }

    let final_slots = generateAvailableSlots(duration, availability);
    res.status(200).json({ slots: final_slots });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

function generateAvailability(startTime, endTime, availability) {
  let new_availability = [];
  for (let slot of availability) {
    console.log("itr", availability);
    if (slot[1] < startTime || slot[0] > endTime) {
      new_availability.push([slot[0], slot[1]]);
    } else if (slot[0] < startTime && slot[1] > endTime) {
      new_availability.push([slot[0], startTime]);
      new_availability.push([endTime, slot[1]]);
    } else if (slot[1] > endTime) {
      new_availability.push([endTime, slot[1]]);
    } else if (slot[0] < startTime) {
      new_availability.push([slot[0], startTime]);
    }
  }

  return new_availability;
}

function generateAvailableSlots(duration, availability) {
  let final_slots = [];
  for (let slot of availability) {
    let startTime = slot[0];
    let endTime = slot[1];
    while (startTime + duration <= endTime) {
      final_slots.push(
        `${String(Math.floor(startTime / 60)).padStart(2, "0")}:${String(
          startTime % 60
        ).padStart(2, "0")}`
      );
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

// API for order list for service provider
// GET -> /api/order
export const getOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await orderModel.find({ userid: id }, { __v: 0 });
    if (response.length > 0) return res.status(200).json(response);
    else return res.status(404).json({ message: "No Orders Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
