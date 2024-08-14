import express from 'express';
import { sendMail ,getInbox,getSentEmails,updateMailStatus,sendReply} from '../controllers/message.controller.js';
import {verifyToken} from "../utils/VerifyUser.js"
const router = express.Router();

router.post('/send', verifyToken, sendMail);
router.get('/inbox', verifyToken, getInbox);
router.get('/getsentmails', verifyToken, getSentEmails);
router.patch('/updateStatus/:id', verifyToken, updateMailStatus);
router.post('/sendreply', verifyToken, sendReply);
export default router;
