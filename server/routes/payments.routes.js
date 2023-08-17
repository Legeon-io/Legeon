import express from 'express';
import { saveAccountDetails, verifyIFSC } from '../controllers/payments.controller.js';

const router = express.Router();


// Get bank details from razorpay through ifsc code
router.get('/ifsc/:ifscCode', verifyIFSC);
router.post('/saveAccountDetails', saveAccountDetails);

export default router;