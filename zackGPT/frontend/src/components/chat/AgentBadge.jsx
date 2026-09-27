import { agentMeta } from '../../utils/agents'

export default function AgentBadge({ agentType }) {
  const meta = agentMeta(agentType)
  if (!meta) return null
  const Icon = meta.icon
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-[#c4b5fd]">
      <Icon className="size-3" />
      {meta.label}
    </span>
  )
}
