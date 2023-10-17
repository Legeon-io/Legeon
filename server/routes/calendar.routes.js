import express from "express";

import {
  calenderLogin,
  createCalenderEvent,
  deleteCalenderEvent,
  deleteCalenderToken,
  getCalenderToken,
  saveCalenderToken,
  updateCalenderEvent,
} from "../controllers/calendar.controller.js";
import verifyToken from "../middlewares/authentication/verifyToken.js";
import verifyCalendarToken from "../middlewares/calender/verifyCalendarToken.js";

const router = express.Router();

// Getting Google Calender Accessibility
router.get("/", calenderLogin);

router.get("/auth/google/callback", verifyCalendarToken, saveCalenderToken);

router
  .route("/calender-token")
  .get(verifyToken, getCalenderToken)
  .delete(verifyToken, deleteCalenderToken);

router
  .route("/event")
  .post(verifyToken, createCalenderEvent)
  .put(verifyToken, updateCalenderEvent)
  .delete(verifyToken, deleteCalenderEvent);

// router.post("/delete-event", createCalenderEvent);

export default router;
