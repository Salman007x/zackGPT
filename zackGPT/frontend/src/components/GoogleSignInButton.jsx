import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle } from '../store/authSlice'
import GoogleIcon from './GoogleIcon'
import Spinner from './common/Spinner'

export default function GoogleSignInButton() {
  const dispatch = useDispatch()
  const signingIn = useSelector((s) => s.auth.signingIn)

  return (
    <button
      type="button"
      onClick={() => dispatch(signInWithGoogle())}
      disabled={signingIn}
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {signingIn ? <Spinner className="size-5 text-neutral-500" label="Signing in" /> : <GoogleIcon />}
      {signingIn ? 'Signing in…' : 'Continue with Google'}
    </button>
  )
}
