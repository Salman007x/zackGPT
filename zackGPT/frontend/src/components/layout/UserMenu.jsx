import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from 'lucide-react'
import { logoutUser } from '../../store/authSlice'
import Avatar from '../common/Avatar'

export default function UserMenu() {
  const dispatch = useDispatch()
  const user = useSelector((s) => s.auth.user)
  const [signingOut, setSigningOut] = useState(false)

  const signOut = async () => {
    setSigningOut(true)
    await dispatch(logoutUser())
  }

  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2">
      <Avatar user={user} className="size-8" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{user?.username}</p>
        <p className="truncate text-xs text-fg-subtle">{user?.email}</p>
      </div>
      <button
        type="button"
        onClick={signOut}
        disabled={signingOut}
        aria-label="Sign out"
        title="Sign out"
        className="rounded-lg p-2 text-fg-subtle transition-colors hover:bg-surface-3 hover:text-fg disabled:opacity-50"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  )
}
