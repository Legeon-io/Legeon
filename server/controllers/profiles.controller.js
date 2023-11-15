import user from "../models/users.js";
import googleUser from "../models/googleUser.js";
import profile from "../models/profiles.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userModel from "../models/users.js";
import profileModel from "../models/profiles.js";
import oneToOneModel from "../models/services/onetoonecall.js";
import messageModel from "../models/services/message.js";

export const getUserProfile = async (req, res) => {
  try {
    const data = req.user;

    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(data.id),
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "_id",
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
      // console.log(googleRes);
      return res.status(200).json(googleRes);
    }
    const userRes = await user.aggregate(pipeline);
    return res.status(200).json(userRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

export const getAccount = async (req, res) => {
  try {
    const data = req.user;
    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(data.id),
        },
      },

      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "_id",
          as: "data",
        },
      },
      {
        $unwind: "$data",
      },
      {
        $project: {
          _id: 1,
          "data.mobile": 1,
          email: 1,
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
      { _id: mongoose.Types.ObjectId(userData.id) },
      {
        $set: {
          profession: data.profession,
          introduction: data.intro,
          bio: data.bio,
          link: data.link,
        },
      },
      { upsert: true }
    );

    if (response) {
      if (userData.isGoogle) {
        const resp = await googleUser.updateOne(
          { _id: mongoose.Types.ObjectId(userData.id) },
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
          { _id: mongoose.Types.ObjectId(userData.id) },
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
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

// Testing Needed
export const updateAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const data = req.body.values;
    // console.log(id);
    // console.log(data);

    const update = await profile.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
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
        { _id: mongoose.Types.ObjectId(id) },
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
    const { username } = req.body;
    const googleUserResponse = await googleUser
      .findOne({ username }, { __v: 0 })
      .select("-createdAt -updatedAt")
      .lean();

    const customUserResponse = await user
      .findOne({ username }, { __v: 0 })
      .select("-createdAt -updatedAt")
      .lean();

    let id;
    let response;

    if (googleUserResponse) {
      id = googleUserResponse._id;
      response = googleUserResponse;
    } else if (customUserResponse) {
      id = customUserResponse._id;
      response = customUserResponse;
    } else return res.status(404).json({ message: "User Not Found" });

    const profileResponse = await profileModel.findOne(
      { _id: id },
      { __v: 0, _id: 0 }
    );
    response.profile = profileResponse;

    // Getting Provider Services
    const oneToOneServices = await oneToOneModel.find(
      { userid: id },
      { __v: 0, userid: 0 }
    );

    const messageServices = await messageModel.find(
      { userid: id },
      { __v: 0, userid: 0 }
    );

    const allServices = [...oneToOneServices, ...messageServices];
    const sortedServices = allServices.sort(
      (a, b) => a.createdAt - b.createdAt
    );

    if (sortedServices) response.services = sortedServices;

    response.servicesCount = sortedServices.length;

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
