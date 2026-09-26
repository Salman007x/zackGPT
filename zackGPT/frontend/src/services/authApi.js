import api from '../lib/api'

export const syncGoogleUser = (idToken) =>
  api.post('/auth/login', { idToken }).then((res) => res.data)
