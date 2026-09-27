import conversationModel from '../models/conversation.model.js';
import Message from '../models/message.model.js';

// Node lowercases incoming header names.
const getUserId = (req) => req.headers['x-user-id'];

export const createConversation = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { title } = req.body;
    const conversation = await conversationModel.create({ userId, title });
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = getUserId(req);
    const conversations = await conversationModel.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConversation = async (req, res) => {
    try {
    const userId = getUserId(req);
    const { conversationId, title } = req.body;
    const conversation = await conversationModel.findOneAndUpdate(
        { _id: conversationId, userId },
        { title },
        { new: true }
    );
    if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
    }
    res.status(200).json(conversation);
    } catch(error){
        res.status(500).json({ message: error.message });
    }

};

export const saveMessages = async (req, res) => {
    try {
    const { conversationId, content, role } = req.body;

    const message = await Message.create({ conversationId, content, role });
    res.status(201).json(message);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMessages = async (req, res) => {
    try {
    const userId = getUserId(req);
    const { conversationId } = req.query;

    const conversation = await conversationModel.exists({ _id: conversationId, userId });
    if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
    }

    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};
