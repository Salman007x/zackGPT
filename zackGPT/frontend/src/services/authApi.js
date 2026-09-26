import api from '../lib/api'

export const syncGoogleUser = (idToken) =>
  api.post('/auth/login', { idToken }).then((res) => res.data)

export const logoutBackend = () => api.post('/auth/logout').then((res) => res.data)

export const fetchCurrentUser = () => api.get('/me').then((res) => res.data)
