import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { syncGoogleUser, logoutBackend, fetchCurrentUser } from '../services/authApi'

const initialState = {
  firebaseUser: null,
  backendUser: null,
  loading: true,
  error: null,
}

export const refreshBackendUser = createAsyncThunk('auth/refreshBackendUser', async () => {
  try {
    const { user } = await fetchCurrentUser()
    return user
  } catch (err) {
    console.warn('[authSlice] /me check failed (no backend session):', err.message)
    return null
  }
})

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()
      try {
        const syncedUser = await syncGoogleUser(idToken)
        console.log('[authSlice] backend user data:', syncedUser)
        await dispatch(refreshBackendUser())
      } catch (syncErr) {
        console.warn('[authSlice] backend user sync failed (is /auth/login built yet?):', syncErr.message)
      }
      return null
    } catch (err) {
      console.error('[authSlice] signInWithPopup failed:', err.code, err.message)
      if (err.code === 'auth/popup-closed-by-user') {
        return rejectWithValue(null)
      }
      return rejectWithValue(err.message)
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await logoutBackend()
  } catch (err) {
    console.warn('[authSlice] backend logout failed:', err.message)
  }
  await signOut(auth)
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    firebaseUserChanged(state, action) {
      state.firebaseUser = action.payload
      state.loading = false
      if (!action.payload) {
        state.backendUser = null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshBackendUser.fulfilled, (state, action) => {
        state.backendUser = action.payload
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.error = null
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.backendUser = null
      })
  },
})

export const { firebaseUserChanged } = authSlice.actions
export default authSlice.reducer
