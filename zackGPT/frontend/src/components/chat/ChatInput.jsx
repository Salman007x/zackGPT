import { useLayoutEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import Spinner from '../common/Spinner'

const MAX_HEIGHT = 220

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  busy = false,
  disabled = false,
  autoFocus = false,
  placeholder = 'Message zackGPT…',
}) {
  const ref = useRef(null)
  const canSend = value.trim().length > 0 && !busy && !disabled

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
  }, [value])

  const submit = () => {
    if (!canSend) return
    onSubmit(value.trim())
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      className="rounded-2xl border border-line-strong bg-surface-2 p-2 shadow-lg shadow-black/20 transition-colors focus-within:border-accent/50"
    >
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <textarea
        id="chat-input"
        ref={ref}
        rows={1}
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault()
            submit()
          }
        }}
        className="block max-h-[220px] w-full resize-none bg-transparent px-2.5 py-2 text-[15px] leading-relaxed text-fg placeholder:text-fg-subtle outline-none disabled:opacity-60"
      />
      <div className="flex items-center justify-between gap-2 pl-2.5">
        <p className="text-[11px] text-fg-subtle max-sm:hidden">
          <kbd className="font-sans">Enter</kbd> to send · <kbd className="font-sans">Shift + Enter</kbd> for a new line
        </p>
        <button
          type="submit"
          disabled={!canSend}
          aria-label={busy ? 'Waiting for response' : 'Send message'}
          className="ml-auto grid size-9 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-fg-subtle"
        >
          {busy ? <Spinner className="size-4 text-fg-muted" label="Waiting for response" /> : <ArrowUp className="size-4" />}
        </button>
      </div>
    </form>
  )
}
