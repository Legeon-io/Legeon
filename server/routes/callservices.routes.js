import express from 'express';

import { createCallService, deleteCallService, getCallService, getCallServiceById, updateCallService } from '../controllers/callservices.controller.js';

const router = express.Router();

// Create call servive
router.post('/createCallService', createCallService);
router.get('/:username/getCallService', getCallService);
router.put('/:username/updateCallService', updateCallService);
router.delete('/:username/deleteCallService', deleteCallService);
router.get('/:username/:id/getCallServiceById', getCallServiceById);

export default router;