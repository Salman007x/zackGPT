import { Bot, Code, FileText, Globe, Image, Presentation } from 'lucide-react'

// Display metadata for the agentType values the backend router can return.
const AGENTS = {
  chat: { label: 'Chat agent', icon: Bot },
  code: { label: 'Code agent', icon: Code },
  image: { label: 'Image agent', icon: Image },
  pdf: { label: 'PDF agent', icon: FileText },
  ppt: { label: 'Slides agent', icon: Presentation },
  search: { label: 'Search agent', icon: Globe },
}

export function agentMeta(agentType) {
  return AGENTS[agentType] ?? null
}
