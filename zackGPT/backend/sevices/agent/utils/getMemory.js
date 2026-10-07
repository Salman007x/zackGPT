import redis from "../../../shared/redis/redis.js";
import { getMessages } from "./getMessages.js";

const MAX_MESSAGES = 20; // sliding window sent to the model
const TTL_SECONDS = 60 * 60; // cache lifetime, refreshed on every access

const memoryKey = (conversationId) => `messages:${conversationId}`;

// Returns the recent history of a conversation, read through a Redis cache.
export const getMemory = async (conversationId, userId) => {
    const key = memoryKey(conversationId);

    const cached = await redis.get(key);
    if (cached) {
        await redis.expire(key, TTL_SECONDS);
        return JSON.parse(cached);
    }

    const messages = (await getMessages(conversationId, userId)).slice(-MAX_MESSAGES);
    await redis.set(key, JSON.stringify(messages), "EX", TTL_SECONDS);
    return messages;
};

// Appends new messages to the cached history, keeping only the latest window.
export const appendMemory = async (conversationId, newMessages) => {
    const key = memoryKey(conversationId);

    const cached = await redis.get(key);
    if (!cached) return; // cold cache: next getMemory reloads from the DB

    const messages = [...JSON.parse(cached), ...newMessages].slice(-MAX_MESSAGES);
    await redis.set(key, JSON.stringify(messages), "EX", TTL_SECONDS);
};
