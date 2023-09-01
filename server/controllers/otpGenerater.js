import otpGenerator from "otp-generator";
import userModel from "../models/users.js";
import speakeasy from "speakeasy";
import bcrypt from "bcrypt";

/** POST: http://localhost:8080/api/users/validEmail */
export const validEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user) {
      const OTP = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      req.app.locals.email = email;
      req.app.locals.OTP = OTP;
      req.app.locals.otpExpiry = Date.now() + 5 * 60 * 1000;
      // console.log(req.app.locals);
      res.status(200).send({ message: "OTP sent successfully.", OTP: OTP });
    } else {
      res.status(400).send({ error: "Email is not valid." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
};

/** POST: http://localhost:8080/api/users/verifyOTP */
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const currentTime = Date.now();
    // console.log(req.app.locals);
    if (currentTime > req.app.locals.otpExpiry) {
      res.status(409).send({ error: "OTP expired." });
      return;
    }

    if (!req.app.locals.OTP) {
      res.status(409).send({ error: "OTP not generated." });
      return;
    }

    if (parseInt(req.app.locals.OTP) === parseInt(otp)) {
      req.app.locals.resetSession = true;
      req.app.locals.OTP = null;

      res.status(200).send({ message: "Valid OTP :)" });
    } else {
      res.status(401).send({ error: "Invalid OTP." });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
};

/** POST: http://localhost:8080/api/users/updatePassword */
export const updatePassword = async (req, res) => {
  try {
    const password = req.body.password;

    if (!req.app.locals.email || !req.app.locals.resetSession) {
      return res.status(409).send({ error: "Email not verified :(" });
    }

    const email = req.app.locals.email;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // console.log(email);
    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { password: password }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found." });
    }

    req.app.locals.resetSession = false;

    // console.log(updatedUser);
    return res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error." });
  }
};
