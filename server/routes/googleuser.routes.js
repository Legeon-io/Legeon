import express from "express";
import passport from "passport";

import googleUser from "../models/googleuser.js";
import User from "../models/users.js";

import jwt from "jsonwebtoken";

const router = express.Router();

import { v4 as uuidv4 } from "uuid";

const generateShortUUID = () => {
  const fullUUID = uuidv4();
  const digitsOnly = fullUUID.replace(/\D/g, "");
  const shortUUID = digitsOnly.substring(0, 6);
  return shortUUID;
};

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

// Google Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

router.get("/auth/failure", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failed",
  });
});

router.get("/protected", isLoggedIn, async (req, res) => {
  if (req.user) {
    const { given_name: firstname, family_name: lastname, email } = req.user;

    // Check for existing gmail in user collection
    const existingCustomUser = await User.findOne({ email });
    if (existingCustomUser) {
      return res
        .status(409)
        .json({ message: "Already Registered in Custom Login" });
    }

    let username = email.split("@")[0];
    const existingUser = await googleUser.findOne({ email });
    if (existingUser) {
      const token = jwt.sign(
        {
          email: existingUser.email,
          username: existingUser.username,
        },
        process.env.JWT_KEY
      );

      res.cookie("token", token, { maxAge: 1000 * 60 * 60 });

      res.status(200).json({
        message: "Login Successful",
        credentails: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          email_verified: req.user.email_verified,
        },
      });
    } else {
      const existingUsername = await googleUser.findOne({ username });
      if (existingUsername) {
        username = `${username}#${generateShortUUID()}`;
      }
      const user = new googleUser({
        username,
        firstname,
        lastname,
        email,
      });

      const savedUser = await user.save();

      const token = jwt.sign(
        {
          email: savedUser.email,
          username: savedUser.username,
        },
        process.env.JWT_KEY
      );

      res.cookie("token", token, { maxAge: 1000 * 60 * 60 });

      res.status(200).json({
        message: "Registered successfully. Welcome to Legeon",
        user: savedUser,
      });
    }
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

export default router;
