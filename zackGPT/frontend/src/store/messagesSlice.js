import { createAsyncThunk, createSlice, isAnyOf, nanoid } from '@reduxjs/toolkit'
import * as chatApi from '../services/chatApi'
import { runAgent } from '../services/agentApi'
import { toUserMessage } from '../utils/errors'
import { titleFromPrompt } from '../utils/format'
import { logoutUser, sessionExpired } from './authSlice'
import { conversationAdded } from './conversationsSlice'

export const fetchMessages = createAsyncThunk(
  'messages/fetch',
  async (conversationId, { rejectWithValue }) => {
    try {
      return await chatApi.listMessages(conversationId)
    } catch (err) {
      return rejectWithValue({
        notFound: err.response?.status === 404,
        message: toUserMessage(err, "Couldn't load this conversation."),
      })
    }
  },
  {
    condition: (conversationId, { getState }) => {
      const status = getState().messages.threads[conversationId]?.status
      return status !== 'loading' && status !== 'succeeded'
    },
  },
)

// The backend has no "send to new chat" endpoint, so a conversation is created first.
export const startConversation = createAsyncThunk(
  'messages/startConversation',
  async (prompt, { dispatch, rejectWithValue }) => {
    try {
      const conversation = await chatApi.createConversation(titleFromPrompt(prompt))
      dispatch(conversationAdded(conversation))
      return conversation._id
    } catch (err) {
      return rejectWithValue(toUserMessage(err, "Couldn't start a new conversation."))
    }
  },
)

export const sendMessage = createAsyncThunk(
  'messages/send',
  async ({ conversationId, prompt }, { rejectWithValue }) => {
    try {
      const result = await runAgent({ conversationId, prompt })
      if (!result?.AIresponse) throw new Error('Empty agent response')
      return {
        _id: nanoid(),
        conversationId,
        role: 'assistant',
        content: result.AIresponse,
        agentType: result.agentType,
        createdAt: new Date().toISOString(),
      }
    } catch (err) {
      return rejectWithValue(
        toUserMessage(err, "The agent couldn't complete this request. Please try again."),
      )
    }
  },
  {
    getPendingMeta: () => ({ createdAt: new Date().toISOString() }),
  },
)

export const retryFailedMessage = (conversationId) => (dispatch, getState) => {
  const failed = getState().messages.failed[conversationId]
  if (!failed) return
  dispatch(failedMessageDiscarded(conversationId))
  return dispatch(sendMessage({ conversationId, prompt: failed.prompt }))
}

const initialState = {
  threads: {}, // [conversationId]: { items, status: idle|loading|succeeded|failed, error, notFound }
  pending: {}, // [conversationId]: true while the agent is working
  failed: {}, // [conversationId]: { prompt, messageId, error }
}

const ensureThread = (state, id) => {
  state.threads[id] ??= { items: [], status: 'idle', error: null, notFound: false }
  return state.threads[id]
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    failedMessageDiscarded(state, { payload: conversationId }) {
      const failed = state.failed[conversationId]
      if (!failed) return
      const thread = state.threads[conversationId]
      if (thread) thread.items = thread.items.filter((m) => m._id !== failed.messageId)
      delete state.failed[conversationId]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state, { meta }) => {
        const thread = ensureThread(state, meta.arg)
        thread.status = 'loading'
        thread.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, { meta, payload }) => {
        const thread = ensureThread(state, meta.arg)
        thread.status = 'succeeded'
        thread.items = payload
      })
      .addCase(fetchMessages.rejected, (state, { meta, payload }) => {
        const thread = ensureThread(state, meta.arg)
        thread.status = 'failed'
        thread.error = payload?.message ?? toUserMessage()
        thread.notFound = Boolean(payload?.notFound)
      })
      .addCase(startConversation.fulfilled, (state, { payload: id }) => {
        ensureThread(state, id).status = 'succeeded'
      })
      .addCase(sendMessage.pending, (state, { meta }) => {
        const { conversationId, prompt } = meta.arg
        // requestId is shared by pending/fulfilled/rejected, so it doubles as the optimistic message id.
        ensureThread(state, conversationId).items.push({
          _id: meta.requestId,
          conversationId,
          role: 'user',
          content: prompt,
          createdAt: meta.createdAt,
        })
        state.pending[conversationId] = true
        delete state.failed[conversationId]
      })
      .addCase(sendMessage.fulfilled, (state, { meta, payload }) => {
        ensureThread(state, meta.arg.conversationId).items.push(payload)
        delete state.pending[meta.arg.conversationId]
      })
      .addCase(sendMessage.rejected, (state, { meta, payload }) => {
        const { conversationId, prompt } = meta.arg
        delete state.pending[conversationId]
        state.failed[conversationId] = {
          prompt,
          messageId: meta.requestId,
          error: payload ?? toUserMessage(),
        }
      })
      .addMatcher(isAnyOf(logoutUser.fulfilled, sessionExpired), () => initialState)
  },
})

export const { failedMessageDiscarded } = messagesSlice.actions
export default messagesSlice.reducer

const EMPTY_THREAD = { items: [], status: 'idle', error: null, notFound: false }
export const selectThread = (state, id) => state.messages.threads[id] ?? EMPTY_THREAD
export const selectIsPending = (state, id) => Boolean(state.messages.pending[id])
export const selectFailure = (state, id) => state.messages.failed[id] ?? null
