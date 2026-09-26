import { useSelector } from 'react-redux'
import GoogleSignInButton from './components/GoogleSignInButton'
import Logo from './components/Logo'
import ProfileCard from './components/ProfileCard'

function App() {
  const { firebaseUser: user, loading, error, backendUser } = useSelector((state) => state.auth)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo className="mb-4 h-14 w-14 drop-shadow-[0_0_24px_rgba(139,59,255,0.35)]" />
          <h1 className="text-2xl font-semibold text-white">zackGPT</h1>
          <p className="mt-1 text-sm text-neutral-400">
            {user ? 'Welcome back' : 'Sign in to continue'}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-sm text-neutral-500">Loading…</p>
        ) : user ? (
          <ProfileCard />
        ) : (
          <GoogleSignInButton />
        )}

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}

        {!loading && user && !backendUser && (
          <p className="mt-4 text-center text-sm text-amber-400">
            Signed in with Google, but no backend session was found (check /auth/login).
          </p>
        )}
      </div>
    </div>
  )
}

export default App
