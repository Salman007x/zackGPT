import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pencil } from 'lucide-react'
import { renameConversation, selectConversationById } from '../../store/conversationsSlice'
import PageHeader from '../layout/PageHeader'
import RenameInput from '../common/RenameInput'

export default function ChatHeader({ conversationId }) {
  const dispatch = useDispatch()
  const conversation = useSelector((s) => selectConversationById(s, conversationId))
  const [editing, setEditing] = useState(false)

  return (
    <PageHeader className="border-b border-line">
      {editing && conversation ? (
        <RenameInput
          className="max-w-md"
          initialValue={conversation.title}
          onCancel={() => setEditing(false)}
          onSubmit={(title) => {
            setEditing(false)
            dispatch(renameConversation({ conversationId, title }))
          }}
        />
      ) : (
        <div className="flex min-w-0 items-center gap-1">
          <h1 className="truncate text-sm font-medium text-fg">{conversation?.title ?? 'Conversation'}</h1>
          {conversation && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              aria-label="Rename conversation"
              title="Rename"
              className="shrink-0 rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <Pencil className="size-3.5" />
            </button>
          )}
        </div>
      )}
    </PageHeader>
  )
}
