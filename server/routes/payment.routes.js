import express from "express";
import {
  getStripeInfo,
  redirectToStripeGateway,
} from "../controllers/paymemt/stripe.controller.js";
import { placeServiceOrder } from "../controllers/order.controller.js";
const router = express.Router();

router.post("/", redirectToStripeGateway);

router.get("/success", placeServiceOrder, getStripeInfo);

export default router;
