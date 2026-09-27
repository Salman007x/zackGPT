import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, SquarePen, X } from 'lucide-react'
import Logo from '../Logo'
import ConversationList from './ConversationList'
import UserMenu from './UserMenu'

export default function Sidebar({ open, onClose }) {
  const [query, setQuery] = useState('')

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-line bg-surface transition-[translate,visibility] duration-200 ease-out md:visible md:static md:translate-x-0 ${
          open ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <Link to="/" className="flex items-center gap-2.5 rounded-md" aria-label="zackGPT home">
            <Logo className="size-7" />
            <span className="text-[15px] font-semibold tracking-tight">zackGPT</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-fg-subtle hover:bg-surface-3 hover:text-fg md:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-2 px-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm font-medium text-fg transition-colors hover:border-line-strong hover:bg-surface-3"
          >
            <SquarePen className="size-4 text-fg-muted" />
            New chat
          </Link>
          <label className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted focus-within:bg-surface-2">
            <Search className="size-4 shrink-0 text-fg-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations"
              aria-label="Search conversations"
              className="w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle outline-none"
            />
          </label>
        </div>

        <nav aria-label="Conversation history" className="mt-1 min-h-0 flex-1 overflow-y-auto">
          <ConversationList query={query} />
        </nav>

        <div className="border-t border-line p-2">
          <UserMenu />
        </div>
      </aside>
    </>
  )
}
