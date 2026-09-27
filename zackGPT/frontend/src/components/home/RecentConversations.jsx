import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowUpRight, MessageSquare } from 'lucide-react'

const LIMIT = 4

export default function RecentConversations() {
  const { items, status } = useSelector((s) => s.conversations)

  if (status === 'loading' && !items.length) {
    return (
      <div className="grid gap-2 sm:grid-cols-2" role="status" aria-label="Loading recent conversations">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="h-[52px] animate-pulse rounded-xl bg-surface" />
        ))}
      </div>
    )
  }
  if (!items.length) return null

  return (
    <section aria-labelledby="recent-heading">
      <h2 id="recent-heading" className="mb-2.5 px-1 text-xs font-medium text-fg-subtle">
        Recent conversations
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.slice(0, LIMIT).map((c) => (
          <li key={c._id}>
            <Link
              to={`/c/${c._id}`}
              className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 transition-colors hover:border-line-strong hover:bg-surface-2"
            >
              <MessageSquare className="size-4 shrink-0 text-fg-subtle" />
              <span className="min-w-0 flex-1 truncate text-sm text-fg-muted group-hover:text-fg">{c.title}</span>
              <ArrowUpRight className="size-3.5 shrink-0 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
