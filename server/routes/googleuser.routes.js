import express from "express";
import passport from "passport";

const router = express.Router();

import {
  authFailure,
  googleAuth,
  googleRedirect,
  logOut,
} from "../controllers/googleuser.controller.js";

import verifyToken from "../middlewares/authentication/verifyToken.js";

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

router.get("/auth/success", verifyToken, googleAuth);

router.get("/auth/failure", authFailure);

router.get("/logout", logOut);

export default router;
