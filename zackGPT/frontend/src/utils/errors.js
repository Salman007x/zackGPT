const GENERIC = 'Something went wrong while processing your request. Please try again.'

export function toUserMessage(error, fallback = GENERIC) {
  if (!error) return fallback
  if (error.code === 'ECONNABORTED') return 'The request took too long. Please try again.'
  if (error.code === 'ERR_NETWORK') return "Can't reach the server. Check your connection and try again."

  const status = error.response?.status
  if (status === 401) return 'Your session has expired. Please sign in again.'
  if (status === 404) return 'That item could not be found.'
  if (status === 400) return 'The request was invalid. Please check your input.'
  return fallback
}
