import googleUser from "../models/googleuser.js";
import User from "../models/users.js";
import jwt from "jsonwebtoken";

const CLIENT_URL = "http://localhost:3000/dashboard";
const SERVER_URL = "http://localhost:8080/auth/failure";

import { v4 as uuidv4 } from "uuid";

const generateShortUUID = () => {
  const fullUUID = uuidv4();
  const digitsOnly = fullUUID.replace(/\D/g, "");
  const shortUUID = digitsOnly.substring(0, 6);
  return shortUUID;
};

export const googleRedirect = async (req, res) => {
  try {
    if (req.user) {
      const { given_name: firstname, family_name: lastname, email } = req.user;

      // Check for existing gmail in user collection
      const existingCustomUser = await User.findOne({ email });
      if (existingCustomUser) {
        res.redirect(SERVER_URL);
        // return res
        //   .status(409)
        //   .json({ message: "Already Registered in Custom Login" });
      }

      let username = email.split("@")[0];
      const existingUser = await googleUser.findOne({ email });
      if (existingUser) {
        const token = jwt.sign(
          {
            email: existingUser.email,
            username: existingUser.username,
          },
          process.env.JWT_KEY,
          { expiresIn: "7d" }
        );

        res.cookie("googletoken", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.redirect(CLIENT_URL);
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
          process.env.JWT_KEY,
          { expiresIn: "7d" }
        );
        res.cookie("googletoken", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.redirect(CLIENT_URL);
      }
    } else {
      // res.status(403).json({ error: true, message: "Not Authorized" });
      res.redirect(SERVER_URL);
    }
  } catch (err) {
    // res.status(500).json({ error: "Internal server error", err });
    res.redirect(SERVER_URL);
  }
};

export const googleAuth = async (req, res) => {
  try {
    if (req.user) {
      const { email } = req.user;

      const userDetails = await googleUser.findOne(
        { email },
        { username: 1, firstname: 1, _id: 0, lastname: 1, email: 1 }
      );
      if (!userDetails) {
        res.status(404).json({ error: "No Google User Found" });
      }

      res.status(200).json({ credentials: userDetails });
    } else {
      res.status(404).json({ error: "No Google User Found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const authFailure = (req, res) => {
  try {
    res.status(401).json({
      error: true,
      message: "Login Failed",
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
  }
};

export const logOut = (req, res) => {
  try {
    req.logOut();
    res.redirect(CLIENT_URL);
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
  }
};
