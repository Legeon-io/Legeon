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
// /api/services
router
  .route("/onetoonecall")
  // drop it 
  .get(verifyToken, getCall)

  // testing
  .put(verifyToken, updateCall)

  // okay
  .post(verifyToken, insertCall);

// Delete Function
// /api/services
router.post("/onetoonecall/delete", verifyToken, deleteCall);
















// Service Message
// /api/services
router
  .route("/message")
  .get(verifyToken, getMessage)
  .put(verifyToken, updateMessage)
  .post(verifyToken, insertMessage);

// Delete Function

//okay 
// /api/services
router.post("/message/delete", verifyToken, deleteMessage);

export default router;
