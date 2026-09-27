import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'
import GoogleSignInButton from '../components/GoogleSignInButton'
import ErrorNotice from '../components/common/ErrorNotice'

export default function LoginPage() {
  const { status, error } = useSelector((s) => s.auth)
  const location = useLocation()

  if (status === 'authenticated') {
    return <Navigate to={location.state?.from ?? '/'} replace />
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Logo className="mx-auto mb-5 size-14" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to zackGPT</h1>
          <p className="mt-2 text-sm text-fg-muted">
            A multi-agent AI workspace. Sign in to pick up where you left off.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <GoogleSignInButton />
          <p className="mt-4 text-center text-xs leading-relaxed text-fg-subtle">
            Your conversations are saved to your account.
          </p>
        </div>

        {error && <ErrorNotice message={error} className="mt-4" />}
      </div>
    </div>
  )
}
