import { useSelector } from 'react-redux'
import Logo from '../Logo'
import { firstName, greeting } from '../../utils/format'

export default function WelcomeSection() {
  const user = useSelector((s) => s.auth.user)
  const name = firstName(user)
  return (
    <div className="mb-8 text-center">
      <Logo className="mx-auto mb-5 size-11" />
      <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {greeting()}
        {name && `, ${name}`}
      </h1>
      <p className="mt-2 text-[15px] text-fg-muted">What would you like to work on today?</p>
    </div>
  )
}
