import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { store } from './store'
import { firebaseUserChanged, refreshBackendUser } from './authSlice'

export function initAuthListener() {
  return onAuthStateChanged(auth, (firebaseUser) => {
    store.dispatch(firebaseUserChanged(firebaseUser))
    if (firebaseUser) {
      store.dispatch(refreshBackendUser())
    }
  })
}
