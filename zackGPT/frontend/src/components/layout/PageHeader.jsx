import { useOutletContext } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function PageHeader({ children, className = '' }) {
  const { openDrawer } = useOutletContext()
  return (
    <header className={`flex h-14 shrink-0 items-center gap-2 px-3 md:px-5 ${className}`}>
      <button
        type="button"
        onClick={openDrawer}
        aria-label="Open sidebar"
        className="-ml-1 rounded-lg p-2 text-fg-muted hover:bg-surface-2 hover:text-fg md:hidden"
      >
        <Menu className="size-5" />
      </button>
      {children}
    </header>
  )
}
