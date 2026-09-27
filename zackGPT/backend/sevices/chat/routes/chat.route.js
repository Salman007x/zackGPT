import express from 'express';
import {createConversation, getConversations, updateConversation, saveMessages, getMessages} from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/conversations', getConversations);
router.post('/create-conversations', createConversation);
router.put('/update-conversations', updateConversation);
router.post('/save-messages', saveMessages);
router.get('/get-messages', getMessages);

export default router;