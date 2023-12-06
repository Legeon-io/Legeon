import { transporter } from "../common.js";

export const sendMail = async (
  serviceType,
  serviceInfo,
  data,
  req,
  res = null,
  response,
  userData
) => {
  // Message for Client
  let message;
  // Message for Service Provider
  let userMessage;
  if (serviceType === "onetoone") {
    // Message for Client
    message = {
      to: data.customer.mailId,
      subject: "LEGEON - Order Successfully Placed",
      text: `Order Summary:\n\nOrder ID: ${req.app.orderId}\nService Title: ${
        serviceInfo.serviceTitle
      }\nScheduled From: ${new Date(res.data.start.dateTime).toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      )}\nScheduled Till: ${new Date(res.data.end.dateTime).toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      )}\nGoogle Meet Link: ${res.data.hangoutLink}\nGoogle Meet Code: ${
        res.data.conferenceData.conferenceId
      }
            \nOrder Placed On: ${new Date(response.createdAt).toLocaleString(
              "en-IN",
              {
                timeZone: "Asia/Kolkata",
              }
            )}
            \nVisit Legeon for More Services: http://localhost:3000`,
    };

    // Message for Service Provider
    userMessage = {
      to: userData.email,
      subject: "LEGEON - You Have Got an Order",
      text: `Order Summary:\n\nOrder ID: ${req.app.orderId}\nService Title: ${
        serviceInfo.serviceTitle
      }\nScheduled From: ${new Date(res.data.start.dateTime).toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      )}\nScheduled Till: ${new Date(res.data.end.dateTime).toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      )}\nGoogle Meet Link: ${res.data.hangoutLink}\nGoogle Meet Code: ${
        res.data.conferenceData.conferenceId
      }
            \nOrder Placed On: ${new Date(response.createdAt).toLocaleString(
              "en-IN",
              {
                timeZone: "Asia/Kolkata",
              }
            )}
            \nGo to Legeon for More Details: http://localhost:3000`,
    };

    // For Client
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      }
    });

    // For Service Provider
    transporter.sendMail(userMessage, (err, info) => {
      if (err) {
        console.log(err);
      }
    });

    // For Service Type Message
  } else if (serviceType === "message") {
    // Message for Service Provider
    userMessage = {
      to: userData.email,
      subject: "LEGEON - You Have Got an Order",
      text: `Order Summary:\n\nOrder ID: ${req.app.orderId}\nService Title: ${
        serviceInfo.serviceTitle
      }
  \nOrder Placed On: ${new Date(response.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
  \nGo to Legeon for More Details: http://localhost:3000`,
    };

    //Mesage For Client
    message = {
      to: data.customer.mailId,
      subject: "LEGEON - Order Successfully Placed",
      text: `Order Summary:\n\nOrder ID: ${req.app.orderId}\nService Title: ${
        serviceInfo.serviceTitle
      }\nOrder Placed On: ${new Date(response.createdAt).toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      )}\n\nYou will receive response from Servcie Provider within 3 to 4 working days!
      \nVisit Legeon for More Services: http://localhost:3000`,
    };

    // For Service Provider
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
    // For Client
    transporter.sendMail(userMessage, (err, info) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
