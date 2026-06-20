import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import { toast } from 'react-toastify'

const handleLogout = async () => {
  await logout()
  toast.info('Signed out')
  navigate('/login')
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>✓ Task Manager</span>
      <div style={styles.right}>
        <span style={styles.email}>{user.email}</span>
        <button style={styles.btn} onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0 1.5rem',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  brand: { fontWeight: 700, fontSize: '1.1rem', color: '#6366f1' },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  email: { fontSize: '0.875rem', color: '#666' },
  btn: {
    padding: '0.4rem 0.9rem',
    background: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem',
    color: '#374151',
  },
}