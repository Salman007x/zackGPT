import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import GoogleIcon from './GoogleIcon'

export default function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const handleClick = async () => {
    setSubmitting(true)
    const data = await signInWithGoogle()
    console.log('Google sign-in data:', data)
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
