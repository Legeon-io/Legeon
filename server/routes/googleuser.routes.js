import express from "express";
import passport from "passport";

const router = express.Router();

import { googleRedirect } from "../controllers/googleuser.controller.js";

// Google Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",

  passport.authenticate("google"),
  googleRedirect
);

// router.get("/logout", logOut);

export default router;
