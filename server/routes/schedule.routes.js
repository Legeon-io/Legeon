import express from "express";

import verifyToken from "../middlewares/authentication/verifyToken.js";
import {
  getEvents,
  setWeek,
  updateEvents,
} from "../controllers/schedule.controller.js";

const router = express.Router();

router.put("/updateevents", verifyToken, updateEvents);

// Set Number of Weeks
router.put("/setweeks", verifyToken, setWeek);

// Service Hub
router.get("/getevents", verifyToken, getEvents);

export default router;
