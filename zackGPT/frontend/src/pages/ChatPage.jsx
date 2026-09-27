import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMessages,
  retryFailedMessage,
  selectFailure,
  selectIsPending,
  selectThread,
  sendMessage,
} from '../store/messagesSlice'
import ChatHeader from '../components/chat/ChatHeader'
import ChatInput from '../components/chat/ChatInput'
import MessageList, { MessageListSkeleton } from '../components/chat/MessageList'
import ErrorNotice from '../components/common/ErrorNotice'

const OBJECT_ID = /^[a-f\d]{24}$/i

export default function ChatPage() {
  const { conversationId } = useParams()
  // Remount per conversation so the draft and scroll position never leak between chats.
  return <ChatView key={conversationId} conversationId={conversationId} />
}

function NotFound() {
  return (
    <div className="grid flex-1 place-items-center px-6 text-center">
      <div>
        <h2 className="text-lg font-semibold">Conversation not found</h2>
        <p className="mt-1 text-sm text-fg-muted">It may have been removed, or the link is incorrect.</p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-lg bg-surface-3 px-4 py-2 text-sm font-medium hover:bg-line-strong"
        >
          Start a new chat
        </Link>
      </div>
    </div>
  )
}

function ChatView({ conversationId }) {
  const dispatch = useDispatch()
  const validId = OBJECT_ID.test(conversationId)
  const thread = useSelector((s) => selectThread(s, conversationId))
  const pending = useSelector((s) => selectIsPending(s, conversationId))
  const failure = useSelector((s) => selectFailure(s, conversationId))
  const [draft, setDraft] = useState('')

  const scrollRef = useRef(null)
  const stickToBottom = useRef(true)

  useEffect(() => {
    if (validId) dispatch(fetchMessages(conversationId))
  }, [validId, conversationId, dispatch])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight
  }, [thread.items.length, thread.status, pending, failure])

  const onScroll = () => {
    const el = scrollRef.current
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120
  }

  const send = (prompt) => {
    stickToBottom.current = true
    setDraft('')
    dispatch(sendMessage({ conversationId, prompt }))
  }

  if (!validId || thread.notFound) {
    return (
      <>
        <ChatHeader conversationId={conversationId} />
        <NotFound />
      </>
    )
  }

  const loading = thread.status === 'idle' || thread.status === 'loading'

  return (
    <>
      <ChatHeader conversationId={conversationId} />

      <div ref={scrollRef} onScroll={onScroll} className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
          {loading && <MessageListSkeleton />}
          {thread.status === 'failed' && (
            <ErrorNotice message={thread.error} onRetry={() => dispatch(fetchMessages(conversationId))} />
          )}
          {thread.status === 'succeeded' && (
            <>
              {thread.items.length === 0 && !pending && (
                <p className="py-16 text-center text-sm text-fg-subtle">No messages yet. Say hello below.</p>
              )}
              <MessageList
                messages={thread.items}
                pending={pending}
                failure={failure}
                onRetry={() => {
                  stickToBottom.current = true
                  dispatch(retryFailedMessage(conversationId))
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSubmit={send}
            busy={pending}
            disabled={thread.status !== 'succeeded'}
            autoFocus
          />
          <p className="mt-2 text-center text-[11px] text-fg-subtle">
            zackGPT can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </>
  )
}
