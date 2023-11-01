import express from "express";
import { redirectToStripeGateway } from "../controllers/paymemt/stripe.controller.js";
const router = express.Router();

router.get("/", redirectToStripeGateway);

export default router;
