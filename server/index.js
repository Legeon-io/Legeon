import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import userRouter from './routes/users.routes.js';
import userProfileRouter from './routes/userprofiles.routes.js'
import callServicesRouter from './routes/callservices.routes.js'
import calendarRouter from './routes/calendar.routes.js';

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

app.get('/google', calendarRouter);
app.get('/google/redirect', calendarRouter);
app.get('/google/schedule_event', calendarRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () => console.log('Database server started on http://localhost:8080')); // Database url
        app.listen(8000, () => console.log('Google services started on http://localhost:8000')); // Google url

    } catch (error) {
        console.log(error);
    }
}

startServer();