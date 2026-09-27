import api from '../lib/api'

export const listConversations = () => api.get('/chat/conversations').then((res) => res.data)

export const createConversation = (title) =>
  api.post('/chat/create-conversations', { title }).then((res) => res.data)

export const renameConversation = (conversationId, title) =>
  api.put('/chat/update-conversations', { conversationId, title }).then((res) => res.data)

export const listMessages = (conversationId) =>
  api.get('/chat/get-messages', { params: { conversationId } }).then((res) => res.data)
