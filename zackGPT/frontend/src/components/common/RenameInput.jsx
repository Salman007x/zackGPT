import { useEffect, useRef, useState } from 'react'

// Inline title editor: Enter saves, Escape cancels, blur saves.
export default function RenameInput({ initialValue, onSubmit, onCancel, className = '' }) {
  const [value, setValue] = useState(initialValue)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    ref.current?.focus()
    ref.current?.select()
  }, [])

  const finish = (save) => {
    if (done.current) return
    done.current = true
    const title = value.trim()
    if (save && title && title !== initialValue) onSubmit(title)
    else onCancel()
  }

  return (
    <input
      ref={ref}
      value={value}
      maxLength={120}
      aria-label="Conversation title"
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => finish(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') finish(true)
        if (e.key === 'Escape') finish(false)
      }}
      className={`w-full rounded-md border border-accent/60 bg-surface-2 px-2 py-1 text-sm text-fg outline-none ${className}`}
    />
  )
}
