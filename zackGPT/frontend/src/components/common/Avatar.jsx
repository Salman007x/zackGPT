import { useState } from 'react'

export default function Avatar({ user, className = 'size-8' }) {
  const [broken, setBroken] = useState(false)
  const name = user?.username ?? user?.email ?? '?'
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  if (user?.avatar && !broken) {
    return (
      <img
        src={user.avatar}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-surface-3 text-xs font-medium text-fg-muted ${className}`}
    >
      {initials}
    </span>
  )
}
