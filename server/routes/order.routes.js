import express from "express";
import {
  getOrders,
  placeServiceOrder,
  showSlots,
} from "../controllers/order.controller.js";

import verifyToken from "../middlewares/authentication/verifyToken.js";

const router = express.Router();

router.route("/").post(placeServiceOrder).get(verifyToken, getOrders);

router.route("/getslots").post(showSlots);

export default router;
