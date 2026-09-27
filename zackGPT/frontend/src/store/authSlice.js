import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { fetchCurrentUser, loginWithIdToken, logoutSession } from '../services/authApi'
import { toUserMessage } from '../utils/errors'

// The backend session cookie (validated via /me) is the source of truth for "signed in".
// Firebase is only used to obtain the Google ID token that /auth/login exchanges for a session.

export const bootstrapSession = createAsyncThunk('auth/bootstrap', async (_, { rejectWithValue }) => {
  try {
    return await fetchCurrentUser()
  } catch (err) {
    if (err.response?.status !== 401) return rejectWithValue(toUserMessage(err))
  }

  await auth.authStateReady()
  if (!auth.currentUser) return null

  // Google sign-in is still valid but the backend session expired: mint a new one silently.
  try {
    const idToken = await auth.currentUser.getIdToken()
    return await loginWithIdToken(idToken)
  } catch {
    return null
  }
})

export const signInWithGoogle = createAsyncThunk('auth/signIn', async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const idToken = await result.user.getIdToken()
    return await loginWithIdToken(idToken)
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
      return rejectWithValue(null)
    }
    if (import.meta.env.DEV) console.error('[auth] sign-in failed:', err.code ?? err.message)
    return rejectWithValue(err.response ? toUserMessage(err) : "Couldn't sign in with Google. Please try again.")
  }
})

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await logoutSession()
  } catch {
    // Clearing local state is still correct even if the server call fails.
  }
  await signOut(auth)
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // checking | authenticated | unauthenticated | error
    user: null,
    error: null,
    signingIn: false,
  },
  reducers: {
    sessionExpired(state) {
      if (state.status !== 'authenticated') return
      state.status = 'unauthenticated'
      state.user = null
      state.error = 'Your session has expired. Please sign in again.'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapSession.pending, (state) => {
        state.status = 'checking'
        state.error = null
      })
      .addCase(bootstrapSession.fulfilled, (state, { payload }) => {
        state.user = payload
        state.status = payload ? 'authenticated' : 'unauthenticated'
      })
      .addCase(bootstrapSession.rejected, (state, { payload }) => {
        state.status = 'error'
        state.error = payload ?? toUserMessage()
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.signingIn = true
        state.error = null
      })
      .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
        state.signingIn = false
        state.user = payload
        state.status = 'authenticated'
      })
      .addCase(signInWithGoogle.rejected, (state, { payload }) => {
        state.signingIn = false
        state.error = payload ?? null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'unauthenticated'
        state.user = null
        state.error = null
      })
  },
})

export const { sessionExpired } = authSlice.actions
export default authSlice.reducer
