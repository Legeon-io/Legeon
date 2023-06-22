import express from 'express';

import { getDecryptedMasterKey, getEncryptedMasterKey } from '../controllers/masterkeys.controller.js';

const router = express.Router();

// Create call servive
router.post('/encryptMasterKey', getEncryptedMasterKey);
router.post('/decryptMasterKey', getDecryptedMasterKey);

export default router;