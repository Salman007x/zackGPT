import { Navigate, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/auth/RequireAuth'
import MainLayout from './components/layout/MainLayout'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="c/:conversationId" element={<ChatPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
