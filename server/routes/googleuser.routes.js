import express from "express";
import passport from "passport";

// import googleUser from "../models/googleuser.js";
// import User from "../models/users.js";

// import jwt from "jsonwebtoken";

const router = express.Router();

// import { v4 as uuidv4 } from "uuid";
import {
  authFailure,
  googleAuth,
  logOut,
} from "../controllers/googleuser.controller.js";

const CLIENT_URL = "http://localhost:3000";
const SERVER_URL = "http://localhost:8080";

// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.sendStatus(401);
// };

// Google Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",

  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}/dashboard`,
    failureRedirect: `${SERVER_URL}/auth/failure`,
  })
);

router.get("/auth/success", googleAuth);

router.get("/auth/failure", authFailure);

router.get("/logout", logOut);

export default router;
