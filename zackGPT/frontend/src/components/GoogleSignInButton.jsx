import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signInWithGoogle } from '../store/authSlice'
import GoogleIcon from './GoogleIcon'

export default function GoogleSignInButton() {
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false)

  const handleClick = async () => {
    setSubmitting(true)
    await dispatch(signInWithGoogle())
    setSubmitting(false)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={submitting}
      className="flex items-center justify-center gap-3 w-full rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
    >
      <GoogleIcon />
      {submitting ? 'Signing in…' : 'Sign in with Google'}
    </button>
  )
}
