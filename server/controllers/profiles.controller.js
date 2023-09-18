import user from "../models/users.js";
import googleUser from "../models/googleuser.js";
import profile from "../models/profiles.js";

export const getUserProfile = async (req, res) => {
  try {
    const data = req.user;
    if (data.isGoogle) {
      const googleRes = await googleUser.find({ username: data.username });
      return res.json(googleRes);
    }
    const userRes = await user.find({ username: data.username });
    res.json(userRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userData = req.user;
    const data = req.body;
    // problem in mongodb for two schmemas
    await profile.updateOne(
      { username: userData.username },
      {
        $set: {
          profession: data.profession,
          introduction: data.introduction,
          bio: data.bio,
        },
      },
      { upsert: true }
    );

    if (userData.isGoogle) {
      //   pending
      const res = await googleUser.updateOne(
        { username: userData.username },
        {
          $set: {
            firstname: userData.firstname,
            lastname: userData.lastname,
            username: userData.username,
          },
        }
      );
      console.log(res);
      //   pending

      return res.json({ message: "Profile Updated Successfully" });
    }

    //   pending
    const res = await user.updateOne(
      { username: userData.username },
      {
        $set: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
        },
      }
    );
    console.log(res);
    //   pending

    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const updateAccount = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
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
