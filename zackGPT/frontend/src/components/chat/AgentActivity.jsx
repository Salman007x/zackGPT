import Logo from '../Logo'

// The agent API is request/response only, so there are no intermediate steps to show,
// just that the request is being handled.
export default function AgentActivity() {
  return (
    <div className="flex gap-3 sm:gap-4" role="status" aria-live="polite">
      <Logo className="mt-0.5 size-7 shrink-0" />
      <div className="flex-1">
        <span className="text-sm font-semibold text-fg">zackGPT</span>
        <div className="mt-2 inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5">
          <span className="dot-pulse flex gap-1" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <span className="text-sm text-fg-muted">Agent is working on your request…</span>
        </div>
      </div>
    </div>
  )
}
