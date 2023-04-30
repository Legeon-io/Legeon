import express from 'express';

import { createUserProfile, getUserProfile, updateUserProfile } from '../controllers/userprofiles.controller.js';

const router = express.Router();

// Create user profile route
router.post('/createUserProfile', createUserProfile);

// Get user profile route
router.get('/:username/getUserProfile', getUserProfile);

// Update user profile route
router.post('/updateUserProfile', updateUserProfile);

export default router;