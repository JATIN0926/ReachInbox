import express from 'express';
import { sendMail } from '../controllers/message.controller.js';
import {verifyToken} from "../utils/VerifyUser.js"
const router = express.Router();

router.post('/send', verifyToken, sendMail);

export default router;
