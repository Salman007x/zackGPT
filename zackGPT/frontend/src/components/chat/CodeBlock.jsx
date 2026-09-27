import { Children, isValidElement } from 'react'
import CopyButton from '../common/CopyButton'

function extract(children) {
  const code = Children.toArray(children).find(isValidElement)
  const className = code?.props.className ?? ''
  const language = /language-([\w+#-]+)/.exec(className)?.[1] ?? ''
  const text = String(code?.props.children ?? '').replace(/\n$/, '')
  return { language, text }
}

export default function CodeBlock({ children }) {
  const { language, text } = extract(children)
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-line bg-[#0e0e11]">
      <div className="flex items-center justify-between border-b border-line bg-surface-2/60 py-1 pr-1.5 pl-4">
        <span className="font-mono text-xs text-fg-subtle">{language || 'text'}</span>
        <CopyButton text={text} label="Copy code" showLabel />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#e4e4ea]">
        <code>{text}</code>
      </pre>
    </div>
  )
}
