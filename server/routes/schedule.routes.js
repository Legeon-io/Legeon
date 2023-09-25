import express from "express";

import verifyToken from "../middlewares/authentication/verifyToken.js";
import { getEvents, updateEvents } from "../controllers/schedule.controller.js";

const router = express.Router();

router.put("/updateevents", verifyToken, updateEvents);

// Service Hub
router.get("/getevents", verifyToken, getEvents);

export default router;
