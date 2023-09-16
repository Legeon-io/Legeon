import express from "express";

import verifyToken from "../middlewares/authentication/verifyToken.js";
import { getUserProfile } from "../controllers/profiles.controller.js";

const router = express.Router();

router.get("/getprofile", verifyToken, getUserProfile);

export default router;
