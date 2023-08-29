import User from "../mongodb/models/users.js";

// SignUp function
/** POST : http://localhost:8080/api/users/signup */
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const username = email.split("@")[0];

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ errorMessage: "Email already registered" });
    }

    const newUser = new User({
      email,
      username,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration successful. Welcome to Legeon",
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// Login function
/** POST : http://localhost:8080/api/users/login */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not registered" });
    }
    // Check if password is correct
    if (password !== user.password) {
      return res.status(402).json({ error: "Invalid credentials" });
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
