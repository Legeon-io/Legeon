import express from 'express';

import { createCallService, deleteCallService, getCallService, updateCallService } from '../controllers/callservices.controller.js';

const router = express.Router();

// Create call servive
router.post('/createCallService', createCallService);
router.get('/:username/getCallService', getCallService);
router.put('/:username/updateCallService', updateCallService);
router.delete('/:username/deleteCallService', deleteCallService);

export default router;