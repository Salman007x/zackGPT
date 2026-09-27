import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConversations } from '../../store/conversationsSlice'
import Sidebar from './Sidebar'

export default function MainLayout() {
  const dispatch = useDispatch()
  const status = useSelector((s) => s.conversations.status)
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  const outletContext = useMemo(() => ({ openDrawer: () => setDrawerOpen(true) }), [])

  useEffect(() => {
    if (status === 'idle') dispatch(fetchConversations())
  }, [status, dispatch])

  // Close the mobile drawer whenever the user navigates.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setDrawerOpen(false)
  }

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => e.key === 'Escape' && closeDrawer()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeDrawer])

  return (
    <div className="flex h-dvh overflow-hidden bg-canvas">
      <Sidebar open={drawerOpen} onClose={closeDrawer} />

      <main className="flex min-w-0 flex-1 flex-col">
        <Outlet context={outletContext} />
      </main>
    </div>
  )
}
