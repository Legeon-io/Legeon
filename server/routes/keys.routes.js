import express from 'express';

import { getEncryptedMasterKey, getDecryptedMasterKey } from '../controllers/masterkeys.controller.js';

const router = express.Router();

// Create call servive
router.post('/get-master-key', getEncryptedMasterKey);
router.post('/get-decrypted-master-key', getDecryptedMasterKey);

export default router;