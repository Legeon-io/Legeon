import express from 'express';

import { createCallService } from '../controllers/callservices.controller.js';

const router = express.Router();

// Create call servive
router.post('/createCallService', createCallService);

export default router;