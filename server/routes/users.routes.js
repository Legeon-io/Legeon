import express from 'express';

import { signup, login, getUser } from '../controllers/users.controller.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Get user profile route
router.get('/:username/getUser', getUser);

export default router;