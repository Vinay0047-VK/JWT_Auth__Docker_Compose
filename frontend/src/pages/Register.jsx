import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'

import { toast } from 'react-toastify'

const handleSubmit = async (e) => {
  
  setLoading(true)
  try {
    await register({ name: form.name, email: form.email, password: form.password })
    toast.success('Account created — please sign in')
    navigate('/login', { state: { registered: true } })
  } catch (err) {
    const data = err.response?.data
    if (data?.email)    setError(data.email[0])
    else if (data?.password) setError(data.password[0])
    else setError('Registration failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

export default function Register() {
  const navigate        = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      await register({ u_name: form.name, email: form.email, password: form.password })
      navigate('/login', { state: { registered: true } })
    } catch (err) {
      const data = err.response?.data
      if (data?.email)    setError(data.email[0])
      else if (data?.password) setError(data.password[0])
      else setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create account</h1>
        <p style={styles.subtitle}>Start managing your tasks</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              autoFocus
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 8 characters"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirm password</label>
            <input
              style={styles.input}
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat password"
              required
            />
          </div>

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
  },
  title:    { fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.25rem' },
  subtitle: { color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  form:  { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.875rem', fontWeight: 500, color: '#374151' },
  input: {
    padding: '0.65rem 0.9rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btn: {
    marginTop: '0.5rem',
    padding: '0.7rem',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: 500,
  },
  footer: {
    marginTop: '1.25rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#666',
  },
}