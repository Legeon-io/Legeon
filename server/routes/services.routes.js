import express from "express";

import verifyToken from "../middlewares/authentication/verifyToken.js";
import {
  deleteCall,
  insertCall,
  updateCall,
} from "../controllers/services/onetoonecall.controller.js";
import {
  deleteMessage,
  insertMessage,
  updateMessage,
} from "../controllers/services/message.controller.js";
import oneToOneModel from "../models/services/onetoonecall.js";
import messageModel from "../models/services/message.js";

const router = express.Router();

// Get Services
router.get("/get-services", verifyToken, async (req, res) => {
  try {
    const userid = req.user.id;
    const oneToOneServices = await oneToOneModel
      .find({ userid })
      .sort({ createdAt: 1 });
    const messageServices = await messageModel
      .find({ userid })
      .sort({ createdAt: 1 });

    const allServices = [...oneToOneServices, ...messageServices];
    const sortedServices = allServices.sort(
      (a, b) => a.createdAt - b.createdAt
    );

    res.status(200).json(sortedServices);
  } catch (err) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

// Service OneToOneCall
// /api/services
router
  .route("/onetoonecall")
  .put(verifyToken, updateCall)

  // okay
  .post(verifyToken, insertCall);

// Delete Function
// /api/services
router.post("/onetoonecall/delete", verifyToken, deleteCall);
















// Service Message
// /api/services/message
router
  .route("/message")
  .put(verifyToken, updateMessage)
  .post(verifyToken, insertMessage);

// Delete Function

//okay 
// /api/services
router.post("/message/delete", verifyToken, deleteMessage);

export default router;
