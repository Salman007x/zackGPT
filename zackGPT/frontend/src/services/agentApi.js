import api from '../lib/api'

const AGENT_TIMEOUT_MS = 120_000

// The agent service persists both the user prompt and the reply itself.
// Resolves to { prompt, AIresponse, agentType, conversationId }.
export const runAgent = ({ prompt, conversationId }) =>
  api
    .post('/agent/chat', { prompt, conversationId }, { timeout: AGENT_TIMEOUT_MS })
    .then((res) => res.data)
