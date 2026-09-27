import { configureStore } from '@reduxjs/toolkit'
import { setUnauthorizedHandler } from '../lib/api'
import authReducer, { sessionExpired } from './authSlice'
import conversationsReducer from './conversationsSlice'
import messagesReducer from './messagesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
  },
})

setUnauthorizedHandler(() => store.dispatch(sessionExpired()))
