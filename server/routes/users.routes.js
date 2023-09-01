import express from "express";

import {
  signup,
  login,
  getUser,
  updateUser,
} from "../controllers/users.controller.js";
import {
  updatePassword,
  validEmail,
  verifyOTP,
} from "../controllers/otpGenerater.js";
import { localVariables } from "../middleware/auth.js";
import verifyToken from "../middlewares/authentication/verifyToken.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Email Valid route
router.post("/validEmail", localVariables, validEmail);

// OTP Valid route
router.post("/verifyOTP", verifyOTP);

// Password Update Route
router.post("/updatePasswod", updatePassword);

// Login route
router.post("/login", login);

// Get user profile route
router.get("/:username/getUser", getUser);

//  Update user route
router.put("/:username/updateUser", updateUser);

export default router;
