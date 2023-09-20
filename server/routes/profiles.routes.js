import express from "express";

import verifyToken from "../middlewares/authentication/verifyToken.js";
import {
  getUserDetails,
  getUserProfile,
} from "../controllers/profiles.controller.js";

const router = express.Router();

router.get("/getprofile", verifyToken, getUserProfile);

// Service Hub
router.post("/getUserDetails", getUserDetails);

export default router;
