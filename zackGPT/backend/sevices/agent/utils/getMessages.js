import axios from "axios";

// Fetches the persisted conversation history from the chat service.
export const getMessages = async (conversationId, userId) => {
    const { data } = await axios.get(`${process.env.CHAT_SERVICE_URL}/get-messages`, {
        params: { conversationId },
        headers: { "x-user-id": userId },
    });
    return data.map(({ role, content }) => ({ role, content }));
};
