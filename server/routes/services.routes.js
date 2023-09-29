import express from "express";

import verifyToken from "../middlewares/authentication/verifyToken.js";
import {
  deleteCall,
  getCall,
  insertCall,
  updateCall,
} from "../controllers/services/onetoonecall.controller.js";
import {
  deleteMessage,
  getMessage,
  insertMessage,
  updateMessage,
} from "../controllers/services/message.controller.js";

const router = express.Router();

// Service OneToOneCall
router
  .route("/onetoonecall")
  .get(verifyToken, getCall)
  .put(verifyToken, updateCall);
// .post(verifyToken, insertCall);

router.post("/onetoonecall", verifyToken, insertCall);

// Delete Function
router.post("/onetoonecall/delete", verifyToken, deleteCall);

// Service Message
router
  .route("/message")
  .get(verifyToken, getMessage)
  .put(verifyToken, updateMessage)
  .post(verifyToken, insertMessage);

// Delete Function
router.post("/message/delete", verifyToken, deleteMessage);

export default router;
