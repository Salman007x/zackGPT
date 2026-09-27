import api from '../lib/api'

export const loginWithIdToken = (idToken) =>
  api.post('/auth/login', { idToken }, { skipAuthRedirect: true }).then((res) => res.data.user)

export const logoutSession = () => api.post('/auth/logout').then((res) => res.data)

export const fetchCurrentUser = () =>
  api.get('/me', { skipAuthRedirect: true }).then((res) => res.data.user)
