import express from "express";
import passport from "passport";

import {
  signup,
  login,
  getUser,
  updateUser,
} from "../controllers/users.controller.js";

const router = express.Router();

// Google Routes
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/failure",
//   })
// );

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Get user profile route
router.get("/:username/getUser", getUser);

//  Update user route
router.put("/:username/updateUser", updateUser);

export default router;
