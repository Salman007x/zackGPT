import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import * as chatApi from '../services/chatApi'
import { toUserMessage } from '../utils/errors'
import { logoutUser, sessionExpired } from './authSlice'

export const fetchConversations = createAsyncThunk(
  'conversations/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await chatApi.listConversations()
    } catch (err) {
      return rejectWithValue(toUserMessage(err, "Couldn't load your conversations."))
    }
  },
)

export const renameConversation = createAsyncThunk(
  'conversations/rename',
  async ({ conversationId, title }, { rejectWithValue }) => {
    try {
      return await chatApi.renameConversation(conversationId, title)
    } catch (err) {
      return rejectWithValue(toUserMessage(err, "Couldn't rename the conversation."))
    }
  },
)

const initialState = {
  items: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  renameError: null,
}

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    conversationAdded(state, { payload }) {
      state.items.unshift(payload)
    },
    renameErrorCleared(state) {
      state.renameError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchConversations.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.items = payload
      })
      .addCase(fetchConversations.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
      .addCase(renameConversation.pending, (state, { meta }) => {
        state.renameError = null
        const item = state.items.find((c) => c._id === meta.arg.conversationId)
        if (item) {
          item.previousTitle = item.title
          item.title = meta.arg.title
        }
      })
      .addCase(renameConversation.fulfilled, (state, { payload }) => {
        const i = state.items.findIndex((c) => c._id === payload._id)
        if (i !== -1) state.items[i] = payload
      })
      .addCase(renameConversation.rejected, (state, { meta, payload }) => {
        state.renameError = payload
        const item = state.items.find((c) => c._id === meta.arg.conversationId)
        if (item?.previousTitle !== undefined) item.title = item.previousTitle
      })
      .addMatcher(isAnyOf(logoutUser.fulfilled, sessionExpired), () => initialState)
  },
})

export const { conversationAdded, renameErrorCleared } = conversationsSlice.actions
export default conversationsSlice.reducer

export const selectConversationById = (state, id) => state.conversations.items.find((c) => c._id === id)
