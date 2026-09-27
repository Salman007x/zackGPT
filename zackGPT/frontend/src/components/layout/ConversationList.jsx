import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageSquare } from 'lucide-react'
import { fetchConversations, renameErrorCleared } from '../../store/conversationsSlice'
import { groupByRecency } from '../../utils/format'
import ConversationItem from './ConversationItem'

function ListSkeleton() {
  return (
    <div className="space-y-1.5 px-2 pt-2" aria-label="Loading conversations" role="status">
      {[72, 88, 60, 80, 66].map((w, i) => (
        <div key={i} className="h-8 animate-pulse rounded-lg bg-surface-2" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

export default function ConversationList({ query }) {
  const dispatch = useDispatch()
  const { items, status, error, renameError } = useSelector((s) => s.conversations)

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = q ? items.filter((c) => c.title.toLowerCase().includes(q)) : items
    return groupByRecency(filtered)
  }, [items, query])

  if (status === 'idle' || (status === 'loading' && !items.length)) return <ListSkeleton />

  if (status === 'failed' && !items.length) {
    return (
      <div className="px-4 py-6 text-center text-sm text-fg-muted">
        <p>{error}</p>
        <button
          type="button"
          onClick={() => dispatch(fetchConversations())}
          className="mt-2 text-xs font-medium text-accent hover:underline"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center px-4 py-10 text-center">
        <MessageSquare className="mb-2 size-5 text-fg-subtle" />
        <p className="text-sm text-fg-muted">No conversations yet</p>
        <p className="mt-1 text-xs text-fg-subtle">Your chats will appear here.</p>
      </div>
    )
  }

  return (
    <div className="px-2 pb-4">
      {renameError && (
        <p role="alert" className="mx-1 mt-2 rounded-md bg-red-500/10 px-2.5 py-1.5 text-xs text-red-200">
          {renameError}{' '}
          <button type="button" className="underline" onClick={() => dispatch(renameErrorCleared())}>
            Dismiss
          </button>
        </p>
      )}
      {groups.length === 0 && <p className="px-3 py-6 text-center text-sm text-fg-subtle">No matching conversations</p>}
      {groups.map((group) => (
        <section key={group.label} className="mt-4 first:mt-2">
          <h3 className="px-3 pb-1 text-[11px] font-medium tracking-wide text-fg-subtle uppercase">{group.label}</h3>
          <ul className="space-y-px">
            {group.items.map((c) => (
              <ConversationItem key={c._id} conversation={c} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
