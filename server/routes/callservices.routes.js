import express from 'express';

import { createCallService, getCallService, updateCallService } from '../controllers/callservices.controller.js';

const router = express.Router();

// Create call servive
router.post('/createCallService', createCallService);
router.get('/:username/getCallService', getCallService);
router.put('/:username/updateCallService', updateCallService);

export default router;