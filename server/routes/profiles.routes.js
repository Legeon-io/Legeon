import express from "express";

import verifyToken from "../middlewares/authentication/verifyToken.js";
import {
  getAccount,
  getUserDetails,
  getUserProfile,
  updateAccount,
  updateUserProfile,
} from "../controllers/profiles.controller.js";

const router = express.Router();

router.get("/getprofile", verifyToken, getUserProfile);

router.put("/putprofile", verifyToken, updateUserProfile);

router.get("/getaccount", verifyToken, getAccount);

router.put("/updateaccount", verifyToken, updateAccount);

// Service Hub
router.post("/getUserDetails", getUserDetails);

export default router;
