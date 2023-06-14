import express from 'express';

import { googleAuthUrl, googleRedirect, scheduleEvent } from '../controllers/calendar.controller.js';

const router = express.Router();

// Create call servive
router.get('/google', googleAuthUrl);
router.get('/google/redirect', googleRedirect);
router.get('/google/schedule_event', scheduleEvent);

export default router;