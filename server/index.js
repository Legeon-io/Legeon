import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import passport from "passport";
import passportStrategy from "./middlewares/authentication/auth.js";
import expressSession from "express-session";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/users.routes.js";
import googleRouter from "./routes/googleuser.routes.js";
import userProfileRouter from "./routes/userprofiles.routes.js";
import profilesRouter from "./routes/profiles.routes.js";
import callServicesRouter from "./routes/callservices.routes.js";
import calendarRouter from "./routes/calendar.routes.js";
import orderRouter from "./routes/order.routes.js";
import paymentsRouter from "./routes/payments.routes.js";

import keysRouter from "./routes/keys.routes.js";
import scheduleRouter from "./routes/schedule.routes.js";
import serviceRouter from "./routes/services.routes.js";

import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));

app.use(express.static(path.join(__dirname, "../client/build")));

// app.use(cors());
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Google OAuth

app.use(expressSession({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send({ message: "Hello Legeon" });
});

// Use the user routes
app.use("/api/users", userRouter);
// Google OAuth
app.use(googleRouter);
app.use("/api/events", scheduleRouter);

// Services OneToOneCall Message
app.use("/api/services", serviceRouter);

// Calender
app.use("/api/calender", calendarRouter);

// Orders
app.use("/api/order", orderRouter);

app.use("/api/userprofiles", userProfileRouter);
app.use("/api/profiles", profilesRouter);
app.use("/api/callservices", callServicesRouter);

app.use("/api/payments/razorpay", paymentsRouter);
app.use("/api/accounts", paymentsRouter);

app.use("/api/masterkeys", keysRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () => {
      console.log(
        "Database server started on",
        process.env.DATABASE_SERVER_URL
      );
      console.log("Google services started on http://localhost:8080");
    }); // Database url
    // app.listen(8000, () =>
    // console.log("Google services started on http://localhost:8000");
    // ); // Google url
  } catch (error) {
    console.log(error);
  }
};

startServer();