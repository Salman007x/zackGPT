import { LoaderCircle } from 'lucide-react'

export default function Spinner({ className = 'size-4', label = 'Loading' }) {
  return <LoaderCircle className={`animate-spin text-fg-subtle ${className}`} aria-label={label} role="status" />
}
