import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { bootstrapSession } from '../../store/authSlice'
import Logo from '../Logo'
import Spinner from '../common/Spinner'
import ErrorNotice from '../common/ErrorNotice'

function Splash({ children }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-5">
        <Logo className="size-11" />
        {children}
      </div>
    </div>
  )
}

export default function RequireAuth() {
  const dispatch = useDispatch()
  const { status, error } = useSelector((s) => s.auth)
  const location = useLocation()

  if (status === 'checking') {
    return (
      <Splash>
        <Spinner className="size-5" label="Checking your session" />
      </Splash>
    )
  }

  if (status === 'error') {
    return (
      <Splash>
        <ErrorNotice message={error} onRetry={() => dispatch(bootstrapSession())} className="w-full" />
      </Splash>
    )
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
