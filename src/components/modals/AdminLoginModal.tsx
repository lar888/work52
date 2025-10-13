import { useState, type FormEvent } from 'react'
import Modal from './Modal'

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (username: string, password: string) => void
}

const AdminLoginModal = ({
  isOpen,
  onClose,
  onLogin
}: AdminLoginModalProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }

    onLogin(username, password)
  }

  return (
    <Modal onClose={onClose}>
      <div className="modal__body">
        <h2 className="modal__title">Admin Login</h2>

        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default AdminLoginModal
