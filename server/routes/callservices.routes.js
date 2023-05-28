import express from 'express';

import { createCallService, getCallService } from '../controllers/callservices.controller.js';

const router = express.Router();

// Create call servive
router.post('/createCallService', createCallService);
router.get('/:username/getCallService', getCallService);

export default router;