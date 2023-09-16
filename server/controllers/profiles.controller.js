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
