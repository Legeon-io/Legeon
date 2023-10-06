import express from "express";

import {
  calenderLogin,
  createCalenderEvent,
  deleteCalenderEvent,
  saveCalenderToken,
  updateCalenderEvent,
} from "../controllers/calendar.controller.js";
import verifyToken from "../middlewares/authentication/verifyToken.js";

const router = express.Router();

// Getting Google Calender Accessibility
router.get("/", calenderLogin);

router.get("/auth/google/callback", saveCalenderToken);

router
  .route("/event")
  .post(verifyToken, createCalenderEvent)
  .put(verifyToken, updateCalenderEvent)
  .delete(verifyToken, deleteCalenderEvent);

// router.post("/delete-event", createCalenderEvent);

export default router;
