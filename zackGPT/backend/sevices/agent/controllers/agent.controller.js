import axios from "axios";
import { graph } from "../graph/graph.js";

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId } = req.body;
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-messages`, {
            conversationId,
            role: "user",
            content: prompt,
        });
        const result = await graph.invoke({ prompt, conversationId });
        const response = result.AIresponse;
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-messages`, {
            conversationId,
            role: "assistant",
            content: response,
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};