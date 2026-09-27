import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

let onUnauthorized = null

// Lets the store react to expired sessions without api.js importing the store (avoids a cycle).
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401 && !error.config?.skipAuthRedirect && onUnauthorized) {
      onUnauthorized()
    }
    if (import.meta.env.DEV) {
      console.error('[api]', error.config?.method?.toUpperCase(), error.config?.url, status ?? error.code, error.response?.data ?? error.message)
    }
    return Promise.reject(error)
  },
)

export default api
