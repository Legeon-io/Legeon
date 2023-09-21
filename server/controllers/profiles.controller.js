import user from "../models/users.js";
import googleUser from "../models/googleuser.js";
import profile from "../models/profiles.js";
import bcrypt from "bcrypt";

export const getUserProfile = async (req, res) => {
  try {
    const data = req.user;
    const pipeline = [
      {
        $match: {
          email: data.email,
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "email",
          foreignField: "email",
          as: "data",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ];
    if (data.isGoogle) {
      const googleRes = await googleUser.aggregate(pipeline);
      return res.status(200).json(googleRes);
    }
    const userRes = await user.aggregate(pipeline);
    return res.status(200).json(userRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userData = req.user;
    const data = req.body;

    const response = await profile.updateOne(
      { email: userData.email },
      {
        $set: {
          profession: data.profession,
          introduction: data.intro,
          bio: data.bio,
        },
      },
      { upsert: true }
    );

    if (response) {
      if (userData.isGoogle) {
        const resp = await googleUser.updateOne(
          { email: userData.email },
          {
            $set: {
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.username,
            },
          }
        );

        if (resp) {
          return res
            .status(200)
            .json({ message: "Profile Updated Successfully" });
        }
      } else {
        const resp = await user.updateOne(
          { email: userData.email },
          {
            $set: {
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.username,
            },
          }
        );

        if (resp) {
          return res
            .status(200)
            .json({ message: "Profile Updated Successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// Testing Needed
export const updateAccount = async (req, res) => {
  try {
    console.log(req.user);
    const email = req.user.email;

    const data = req.body.values;
    console.log(email);
    console.log(data);

    const update = await profile.updateOne(
      { email: email },
      {
        $set: {
          mobile: data.mobile,
        },
      },
      { upsert: true }
    );

    if (!req.user.isGoogle) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      await user.updateOne(
        { email },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
    }

    if (update) {
      res.status(200).json({ message: "Account Update Successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(504).json({ errorMessage: "Internal server error" });
  }
};

// Get User Details For Service Hub
export const getUserDetails = async (req, res) => {
  try {
    const username = req.body.username;
    const pipeline = [
      {
        $match: {
          username: username,
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "username",
          foreignField: "username",
          as: "userData",
        },
      },
      {
        $project: {
          _id: 0,
          password: 0,
        },
      },
    ];

    const userData = await user.aggregate(pipeline);

    if (userData.length > 0) return res.status(200).json(userData);
    const googleData = await googleUser.aggregate(pipeline);

    if (googleData.length > 0) return res.status(200).json(googleData);
    return res.status(404).json({ message: "Account Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
