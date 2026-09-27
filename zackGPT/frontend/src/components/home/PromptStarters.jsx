import { BookOpen, Lightbulb, Mail, Scale } from 'lucide-react'

// Conversation starters: they only prefill the composer, nothing is sent until the user submits.
const STARTERS = [
  { icon: BookOpen, label: 'Explain a concept', prompt: 'Explain how HTTP cookies work, with a simple example.' },
  { icon: Lightbulb, label: 'Brainstorm ideas', prompt: 'Give me 5 name ideas for a developer productivity tool.' },
  { icon: Mail, label: 'Draft a message', prompt: 'Draft a short, friendly email asking to reschedule a meeting.' },
  { icon: Scale, label: 'Compare options', prompt: 'Compare REST and GraphQL in a short table.' },
]

export default function PromptStarters({ onPick }) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {STARTERS.map(({ icon: Icon, label, prompt }) => (
        <button
          key={label}
          type="button"
          onClick={() => onPick(prompt)}
          className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[13px] text-fg-muted transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-fg"
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  )
}
