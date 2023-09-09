import User from "../models/users.js";
import googleUser from "../models/googleuser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { v4 as uuidv4 } from "uuid";

const generateShortUUID = () => {
  const fullUUID = uuidv4();
  const digitsOnly = fullUUID.replace(/\D/g, "");
  const shortUUID = digitsOnly.substring(0, 6);
  return shortUUID;
};

// SignUp function
/** POST : http://localhost:8080/api/users/signup */
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let username = email.split("@")[0];
    // console.log(req.body);

    // Check for existing gmail in google user collection
    const existingCustomUser = await googleUser.findOne({ email });
    if (existingCustomUser) {
      return res
        .status(409)
        .json({ message: "Already Registered in Google Login" });
    }

    if (!firstname || !email || !password) {
      return res.status(404).json({ error: "Missing Credentials" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ err: "Email Taken" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      username = `${username}#${generateShortUUID()}`;
    }

    const newUser = new User({
      email,
      lastname,
      firstname,
      username,
      password,
    });

    console.log(newUser);

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    // console.error("Error during registration:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// Login function
/** POST : http://localhost:8080/api/users/login */
export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!email || !password || !user || !passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
      },
      process.env.JWT_KEY
    );

    // res.setHeader("Authorization", `Bearer ${token}`);

    if (!email || !password || !user || !passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    res.status(200).json({
      message: "Login successful",

      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};

// Get User function
export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not registered" });
    }
    res.status(200).json({ message: "User information received", user: user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};

// Update User function
export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { email } = req.body;

    const currentUser = await User.findOne({ username });

    // Update user data if changes are made
    if (
      firstname !== undefined &&
      firstname !== null &&
      firstname !== "" &&
      firstname !== currentUser.firstname
    ) {
      currentUser.firstname = firstname;
    }

    if (
      lastname !== undefined &&
      lastname !== null &&
      lastname !== "" &&
      lastname !== currentUser.lastname
    ) {
      currentUser.lastname = lastname;
    }

    if (
      email !== undefined &&
      email !== null &&
      email !== "" &&
      email !== currentUser.email
    ) {
      currentUser.email = email;
    }

    const updatedUser = await currentUser.save();

    res.status(200).json({
      message: "Changes updated in the users table",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};
