import { memo } from 'react'
import Logo from '../Logo'
import CopyButton from '../common/CopyButton'
import { formatTime } from '../../utils/format'
import AgentBadge from './AgentBadge'
import MarkdownContent from './MarkdownContent'

function UserMessage({ message }) {
  return (
    <div className="group flex flex-col items-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-surface-3 px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap text-fg sm:max-w-[75%]">
        {message.content}
      </div>
      <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 max-md:opacity-100">
        <time className="px-1 text-[11px] text-fg-subtle" dateTime={message.createdAt}>
          {formatTime(message.createdAt)}
        </time>
        <CopyButton text={message.content} label="Copy message" />
      </div>
    </div>
  )
}

function AssistantMessage({ message }) {
  return (
    <div className="group flex gap-3 sm:gap-4">
      <Logo className="mt-0.5 size-7 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-fg">zackGPT</span>
          <AgentBadge agentType={message.agentType} />
        </div>
        <MarkdownContent content={message.content} />
        <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 max-md:opacity-100">
          <CopyButton text={message.content} label="Copy response" />
          <time className="px-1 text-[11px] text-fg-subtle" dateTime={message.createdAt}>
            {formatTime(message.createdAt)}
          </time>
        </div>
      </div>
    </div>
  )
}

function Message({ message }) {
  return message.role === 'user' ? <UserMessage message={message} /> : <AssistantMessage message={message} />
}

export default memo(Message)
