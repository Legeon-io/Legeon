import express from "express";
import passport from "passport";

import googleUser from "../mongodb/models/googleuser.js";

const router = express.Router();

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
    let username = email.split("@")[0];
    const existingUser = await googleUser.findOne({ email });
    if (existingUser) {
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
        username = `${username}#${Math.floor(1000 + Math.random() * 9000)}`;
      }
      const user = new googleUser({
        username,
        firstname,
        lastname,
        email,
      });

      const savedUser = await user.save();

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
