import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/users.routes.js';
import userProfileRouter from './routes/userprofiles.routes.js'
import callServicesRouter from './routes/callservices.routes.js'

import { google } from 'googleapis';
import axios from 'axios';
import { v4 as uuid } from 'uuid'

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(cors());

app.get('/', (req, res) => {
    res.send({ message: "Hello Legeon" });
})

// Use the user routes
app.use('/api/users', userRouter);
app.use('/api/userprofiles', userProfileRouter);
app.use('/api/callservices', callServicesRouter);

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
    'https://www.googleapis.com/auth/calendar'
];

app.get('/google', (req, res) => {

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });

    res.redirect(url);
});

app.get('/google/redirect', async (req, res) => {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.send({
        message: "You have successfully logged in",
    });
});

app.get("/google/schedule_event", async (req, res) => {
    await calendar.events.insert({
        calendarId: "primary",
        auth: oauth2Client,
        conferenceDataVersion : 1,
        requestBody: {
            summary: "USA Discussion",
            start: {
                dateTime: "2023-06-14T10:00:00+05:30"
            },
            end: {
                dateTime: "2023-06-14T11:00:00+05:30"
            },
            organizer: {
                email: "organizer@example.com",
                displayName: "Organizer Name"
            },
            attendees: [
                { email: "example@gmail.com" }
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", "minutes": 30 },
                    { method: "popup", "minutes": 10 }
                ]
            },
            conferenceData: {
                createRequest: {
                    requestId: uuid(),
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    }
                }
            }
        }
    });

    res.send({
        message: "Event created",
    });
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () => console.log('Server started on http://localhost:8080')); // Database url
        app.listen(8000, () => console.log('Server started on http://localhost:8000')); // Google redirects

    } catch (error) {
        console.log(error);
    }
}

startServer();