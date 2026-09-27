import { CircleAlert, RefreshCw } from 'lucide-react'

export default function ErrorNotice({ message, onRetry, retryLabel = 'Try again', className = '' }) {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.07] px-4 py-3 text-sm text-red-200 ${className}`}
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" />
      <p className="flex-1 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-red-100 transition-colors hover:bg-red-500/15"
        >
          <RefreshCw className="size-3.5" />
          {retryLabel}
        </button>
      )}
    </div>
  )
}
