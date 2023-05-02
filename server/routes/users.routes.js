import express from 'express';

import { signup, login, getUser, updateUser } from '../controllers/users.controller.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Get user profile route
router.get('/:username/getUser', getUser);

//  Update user route
router.put('/:username/updateUser', updateUser);

export default router;