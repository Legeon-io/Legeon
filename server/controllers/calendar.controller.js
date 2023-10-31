import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import calenderTokenModel from "../models/calender/calendertoken.js";

const CLIENT_ID =
  "762015424404-a8lg6tnfh8dma5vps7dkaj63d4j0t7b3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

const REDIRECT_URI = "http://localhost:8080/api/calender/auth/google/callback";

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const calendar = google.calendar({ version: "v3" });

export const calenderLogin = (req, res) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
    });

    const data = req.headers.cookie.split(";");
    let token;
    // console.log(data);
    data.map((item) => {
      if (item.split("=")[0] == "token") {
        // console.log(item.split("=")[1]);
        token = item.split("=")[1];
      }
    });

    res.header("Authorization", `Bearer ${token}`);
    res.redirect(authUrl);
  } catch (err) {
    console.log(err);
  }
};

export const saveCalenderToken = async (req, res) => {
  try {
    const id = req.user.id;
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    const data = new calenderTokenModel({
      userid: id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      scope: tokens.scope,
      token_type: tokens.token_type,
      expiry_date: tokens.expiry_date,
    });

    await data.save();

    res.redirect("http://localhost:3000/availability");
  } catch (error) {
    console.log(error);
    res.redirect("http://localhost:3000/availability?error=true");
    // res.status(500).json({ error: "Authentication Failed" });
  }
};

export const deleteCalenderToken = async (req, res) => {
  try {
    const id = req.user.id;
    await calenderTokenModel.deleteOne({
      userid: id,
    });

    res.status(200).json({ message: "Removed Token Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", err });
  }
};
export const getCalenderToken = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await calenderTokenModel.findOne(
      {
        userid: id,
      },
      { _id: 0, userid: 0 }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const createCalenderEvent = async (req, res) => {
  try {
    const data = req.body;
    const id = req.user.id;
    // const { tokens } = await oauth2Client.getToken(token);
    // console.log(tokens);
    // oauth2Client.setCredentials(tokens);

    const token = {
      access_token:
        "ya29.a0AfB_byAtfrZ3eUIKLDBHdHZi33GX3Rkrku7lj2jz9ZlBOH4Cx5aqZ2HVN0uMZSmReZuhcz6aqXGHQeDOKyZJMBcapr_WC6b2mwwXpWfh-y4OKYwQMm5xRNX6yq7909w4wbO9miAH4nIGOR0I8pOweKL5vuC4FJirp4CbaCgYKASASARASFQGOcNnCr7puXtAuUkXQEK1_viITlw0171",
      refresh_token:
        "1//0gyI8zrhpxYq2CgYIARAAGBASNwF-L9Irh3UKcQy5IVS2YUuFWFQP_sfqykrvCChrUsdMtyZz5_9hJiY5upbG6D9K68Yl5P_rsmI",
      scope: "https://www.googleapis.com/auth/calendar",
      token_type: "Bearer",
      expiry_date: 1696535912621,
    };

    oauth2Client.setCredentials(token);

    const event = {
      summary: data.summary,
      description: data.description,
      start: {
        dateTime: data.start, // "2023-11-05T10:00:00"
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: data.end, // "2023-11-05T12:00:00"
        timeZone: "Asia/Kolkata",
      },
    };

    calendar.events.insert(
      {
        calendarId: "primary",
        resource: event,
        auth: oauth2Client,
      },
      (err, res) => {
        if (err) {
          console.error("Error creating event:", err);
          return;
        }
        // console.log("Event created:", res.data.htmlLink);
        console.log(res.data);
      }
    );
    res.status(200).json({ message: "Event Created in Google Calender" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
  }
};

// Later
export const updateCalenderEvent = async (req, res) => {
  try {
    const data = req.body;

    const token = {
      access_token:
        "ya29.a0AfB_byAtfrZ3eUIKLDBHdHZi33GX3Rkrku7lj2jz9ZlBOH4Cx5aqZ2HVN0uMZSmReZuhcz6aqXGHQeDOKyZJMBcapr_WC6b2mwwXpWfh-y4OKYwQMm5xRNX6yq7909w4wbO9miAH4nIGOR0I8pOweKL5vuC4FJirp4CbaCgYKASASARASFQGOcNnCr7puXtAuUkXQEK1_viITlw0171",
      refresh_token:
        "1//0gyI8zrhpxYq2CgYIARAAGBASNwF-L9Irh3UKcQy5IVS2YUuFWFQP_sfqykrvCChrUsdMtyZz5_9hJiY5upbG6D9K68Yl5P_rsmI",
      scope: "https://www.googleapis.com/auth/calendar",
      token_type: "Bearer",
      expiry_date: 1696535912621,
    };

    oauth2Client.setCredentials(token);

    const eventId = "k2hqqaplbprb6o14a0onbftmtg";
    const updateEvent = {
      summary: data.summary,
      description: data.description,
      start: {
        dateTime: data.start, // "2023-11-08T11:00:00"
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: data.end, // "2023-11-08T11:00:00"
        timeZone: "Asia/Kolkata",
      },
    };

    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId: eventId,
      resource: updateEvent,
      auth: oauth2Client,
    });
    console.log("Event updated successfully:", response.data);
    res.status(200).json({ message: "Event Updated in Google Calender" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const deleteCalenderEvent = async (req, res) => {
  try {
    // const eventId = req.body.eventId;
    const token = {
      access_token:
        "ya29.a0AfB_byAtfrZ3eUIKLDBHdHZi33GX3Rkrku7lj2jz9ZlBOH4Cx5aqZ2HVN0uMZSmReZuhcz6aqXGHQeDOKyZJMBcapr_WC6b2mwwXpWfh-y4OKYwQMm5xRNX6yq7909w4wbO9miAH4nIGOR0I8pOweKL5vuC4FJirp4CbaCgYKASASARASFQGOcNnCr7puXtAuUkXQEK1_viITlw0171",
      refresh_token:
        "1//0gyI8zrhpxYq2CgYIARAAGBASNwF-L9Irh3UKcQy5IVS2YUuFWFQP_sfqykrvCChrUsdMtyZz5_9hJiY5upbG6D9K68Yl5P_rsmI",
      scope: "https://www.googleapis.com/auth/calendar",
      token_type: "Bearer",
      expiry_date: 1696535912621,
    };

    const eventId = "k2hqqaplbprb6o14a0onbftmtg";

    oauth2Client.setCredentials(token);

    await calendar.events.delete({
      calendarId: "primary",
      eventId: eventId,
      auth: oauth2Client,
    });
    console.log("Event deleted successfully!");
    res.status(200).json({ message: "Event Deleted from Google Calender" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", err });
  }
};
