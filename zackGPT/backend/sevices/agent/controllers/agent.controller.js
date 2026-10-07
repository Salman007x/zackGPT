import axios from "axios";
import { graph } from "../graph/graph.js";
import { getMemory, appendMemory } from "../utils/getMemory.js";

const saveMessage = (conversationId, role, content) =>
    axios.post(`${process.env.CHAT_SERVICE_URL}/save-messages`, { conversationId, role, content });

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId } = req.body;
        const userId = req.headers["x-user-id"];

        // Load history before saving the new prompt so it isn't duplicated.
        const history = await getMemory(conversationId, userId);

        await saveMessage(conversationId, "user", prompt);
        const { agentType, AIresponse } = await graph.invoke({ prompt, conversationId, history });
        await saveMessage(conversationId, "assistant", AIresponse);

        await appendMemory(conversationId, [
            { role: "user", content: prompt },
            { role: "assistant", content: AIresponse },
        ]);

        res.status(200).json({ prompt, conversationId, agentType, AIresponse });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
