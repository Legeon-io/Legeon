import googleUser from "../models/googleuser.js";
import User from "../models/users.js";
import jwt from "jsonwebtoken";

const CLIENT_FAIL_URL = "http://localhost:3000";
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
        return res.redirect(`${CLIENT_FAIL_URL}/?accountRegistered=true`);
        // return res
        //   .status(409)
        //   .json({ message: "Already Registered in Custom Login" });
      }

      let username = email.split("@")[0];
      const existingUser = await googleUser.findOne({ email });
      if (existingUser) {
        const token = jwt.sign(
          {
            id: existingUser._id,
            isGoogle: true,
          },
          process.env.JWT_KEY,
          { expiresIn: "7d" }
        );

        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
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

        await user.save();

        const token = jwt.sign(
          {
            id: existingUser._id,
            isGoogle: true,
          },
          process.env.JWT_KEY,
          { expiresIn: "7d" }
        );
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
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

// export const logOut = (req, res) => {
//   try {
//     req.logOut();
//     res.redirect(CLIENT_URL);
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error", err });
//   }
// };
