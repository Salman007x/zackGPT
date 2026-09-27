import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sendMessage, startConversation } from '../store/messagesSlice'
import PageHeader from '../components/layout/PageHeader'
import ChatInput from '../components/chat/ChatInput'
import ErrorNotice from '../components/common/ErrorNotice'
import WelcomeSection from '../components/home/WelcomeSection'
import PromptStarters from '../components/home/PromptStarters'
import RecentConversations from '../components/home/RecentConversations'

export default function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [draft, setDraft] = useState('')
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState(null)

  const start = async (prompt) => {
    setStarting(true)
    setError(null)
    try {
      const conversationId = await dispatch(startConversation(prompt)).unwrap()
      dispatch(sendMessage({ conversationId, prompt }))
      navigate(`/c/${conversationId}`)
    } catch (message) {
      setError(message)
      setStarting(false)
    }
  }

  return (
    <>
      <PageHeader />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-4 pt-6 pb-16 sm:px-6">
          <WelcomeSection />
          <ChatInput
            value={draft}
            onChange={setDraft}
            onSubmit={start}
            busy={starting}
            autoFocus
            placeholder="Ask anything, and it will be routed to the right agent…"
          />
          {error && <ErrorNotice message={error} className="mt-3" />}
          <PromptStarters onPick={setDraft} />
          <div className="mt-12">
            <RecentConversations />
          </div>
        </div>
      </div>
    </>
  )
}
