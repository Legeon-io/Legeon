import express from 'express';
import { verifyIFSC } from '../controllers/payments.controller.js';

const router = express.Router();


// Get bank details from razorpay through ifsc code
router.get('/ifsc/:ifscCode', verifyIFSC);

export default router;