import User from "../mongodb/models/users.js";
import bcrypt from "bcrypt";

// SignUp function
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let username = email.split("@")[0];

    if (!firstname || !email || !password) {
      return res.status(404).json({ error: "Missing Credentials" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const errorMessage = "Email already registered";
      return res.status(409).json({ errorMessage });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      username = `${username}#${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const user = new User({
      username,
      firstname,
      lastname,
      email,
      password,
    });

    const savedUser = await user.save();

    res.status(200).json({
      message: "Registered successfully. Welcome to Legeon",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user: user });
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
    const { firstname, lastname, email } = req.body;

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
