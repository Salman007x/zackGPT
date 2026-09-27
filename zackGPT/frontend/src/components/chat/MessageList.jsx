import ErrorNotice from '../common/ErrorNotice'
import AgentActivity from './AgentActivity'
import Message from './Message'

export default function MessageList({ messages, pending, failure, onRetry }) {
  return (
    <ol className="space-y-8" aria-label="Messages">
      {messages.map((m) => (
        <li key={m._id}>
          <Message message={m} />
        </li>
      ))}
      {pending && (
        <li>
          <AgentActivity />
        </li>
      )}
      {failure && (
        <li>
          <ErrorNotice message={failure.error} onRetry={onRetry} retryLabel="Retry" />
        </li>
      )}
    </ol>
  )
}

export function MessageListSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading messages">
      <div className="ml-auto h-10 w-2/5 animate-pulse rounded-2xl bg-surface-2" />
      <div className="flex gap-4">
        <div className="size-7 shrink-0 animate-pulse rounded-lg bg-surface-2" />
        <div className="flex-1 space-y-2.5">
          <div className="h-3.5 w-24 animate-pulse rounded bg-surface-2" />
          <div className="h-3.5 w-full animate-pulse rounded bg-surface-2" />
          <div className="h-3.5 w-11/12 animate-pulse rounded bg-surface-2" />
          <div className="h-3.5 w-3/5 animate-pulse rounded bg-surface-2" />
        </div>
      </div>
    </div>
  )
}
