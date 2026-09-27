import conversationModel from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers['X-user-id'];
    console.log('User ID from header:', userId);
    const conversation = await conversationModel.create({ userId, title });
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers['X-user-id'];
    console.log('User ID from header:', userId);
    const conversations = (await conversationModel.find({ userId }).sort({updatedAt:-1}));
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConversation = async (req, res) => {
    try {
    const { conversationId, title } = req.body;
    const conversation = await conversationModel.findByIdAndUpdate(conversationId, { title }, { new: true });
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
    const { conversationId} = req.body;

    const message = await Message.create({ conversationId,}).sort({createdAt:-1});
    res.status(201).json(message);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};


