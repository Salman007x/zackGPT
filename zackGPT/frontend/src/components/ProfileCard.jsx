import { useAuth } from '../context/AuthContext'

export default function ProfileCard() {
  const { user, logout } = useAuth()

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-lg shadow-black/20">
      <img
        src={user.photoURL}
        alt={user.displayName ?? 'Profile photo'}
        referrerPolicy="no-referrer"
        className="h-20 w-20 rounded-full border border-neutral-700"
      />
      <div className="text-center">
        <h2 className="text-lg font-semibold text-white">{user.displayName}</h2>
        <p className="text-sm text-neutral-400">{user.email}</p>
      </div>
      <button
        type="button"
        onClick={logout}
        className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-200 transition hover:bg-neutral-800"
      >
        Sign out
      </button>
    </div>
  )
}
