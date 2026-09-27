import { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Pencil } from 'lucide-react'
import { renameConversation } from '../../store/conversationsSlice'
import RenameInput from '../common/RenameInput'

function ConversationItem({ conversation }) {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <li className="px-1 py-0.5">
        <RenameInput
          initialValue={conversation.title}
          onCancel={() => setEditing(false)}
          onSubmit={(title) => {
            setEditing(false)
            dispatch(renameConversation({ conversationId: conversation._id, title }))
          }}
        />
      </li>
    )
  }

  return (
    <li className="group relative">
      <NavLink
        to={`/c/${conversation._id}`}
        title={conversation.title}
        className={({ isActive }) =>
          `block truncate rounded-lg py-2 pr-9 pl-3 text-sm transition-colors ${
            isActive ? 'bg-surface-3 text-fg' : 'text-fg-muted hover:bg-surface-2 hover:text-fg'
          }`
        }
      >
        {conversation.title}
      </NavLink>
      <button
        type="button"
        onClick={() => setEditing(true)}
        aria-label={`Rename “${conversation.title}”`}
        className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1.5 text-fg-subtle opacity-0 transition hover:bg-surface-3 hover:text-fg focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100"
      >
        <Pencil className="size-3.5" />
      </button>
    </li>
  )
}

export default memo(ConversationItem)
