import { google } from 'googleapis';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

// Google Auth

const calendar = google.calendar({
    version: "v3",
    auth: process.env.API_KEY,
});

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

const scopes = [
    'https://www.googleapis.com/auth/calendar',
];

export const googleAuthUrl = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });

    res.redirect(url);
};

export const googleRedirect = async (req, res) => {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.send({
        message: "You have successfully logged in",
    });

};

export const scheduleEvent = async (req, res) => {
    await calendar.events.insert({
        calendarId: "primary",
        auth: oauth2Client,
        conferenceDataVersion: 1,
        requestBody: {
            summary: "USA Discussion",
            start: {
                dateTime: "2023-06-14T10:00:00+05:30",
            },
            end: {
                dateTime: "2023-06-14T11:00:00+05:30",
            },
            organizer: {
                email: "organizer@example.com",
                displayName: "Organizer Name",
            },
            attendees: [
                { email: "example@gmail.com" },
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 30 },
                    { method: "popup", minutes: 10 },
                ],
            },
            conferenceData: {
                createRequest: {
                    requestId: uuid(),
                    conferenceSolutionKey: {
                        type: "hangoutsMeet",
                    },
                },
            },
        },
    });

    res.send({
        message: "Event created",
    });
};
