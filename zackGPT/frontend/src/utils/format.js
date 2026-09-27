const TITLE_MAX = 60

export function titleFromPrompt(prompt) {
  const oneLine = prompt.replace(/\s+/g, ' ').trim()
  return oneLine.length > TITLE_MAX ? `${oneLine.slice(0, TITLE_MAX - 1).trimEnd()}…` : oneLine
}

export function formatTime(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function firstName(user) {
  return user?.username?.split(' ')[0] ?? ''
}

const DAY = 86_400_000

// Buckets conversations (already sorted newest first) for the sidebar.
export function groupByRecency(conversations, now = Date.now()) {
  const startOfToday = new Date(now).setHours(0, 0, 0, 0)
  const groups = [
    { label: 'Today', items: [] },
    { label: 'Yesterday', items: [] },
    { label: 'Previous 7 days', items: [] },
    { label: 'Older', items: [] },
  ]
  for (const c of conversations) {
    const t = new Date(c.updatedAt ?? c.createdAt).getTime()
    if (t >= startOfToday) groups[0].items.push(c)
    else if (t >= startOfToday - DAY) groups[1].items.push(c)
    else if (t >= startOfToday - 7 * DAY) groups[2].items.push(c)
    else groups[3].items.push(c)
  }
  return groups.filter((g) => g.items.length)
}
