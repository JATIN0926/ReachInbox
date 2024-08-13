import express from 'express';
import { sendMail ,getInbox} from '../controllers/message.controller.js';
import {verifyToken} from "../utils/VerifyUser.js"
const router = express.Router();

router.post('/send', verifyToken, sendMail);
router.get('/inbox', verifyToken, getInbox);

export default router;
