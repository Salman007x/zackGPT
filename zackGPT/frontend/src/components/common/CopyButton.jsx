import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyButton({ text, label = 'Copy', className = '', showLabel = false }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be unavailable on insecure origins; nothing useful to show.
    }
  }

  const Icon = copied ? Check : Copy
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied' : label}
      className={`inline-flex items-center gap-1.5 rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-3 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent ${className}`}
    >
      <Icon className="size-3.5" />
      {showLabel && <span className="text-xs">{copied ? 'Copied' : label}</span>}
    </button>
  )
}
