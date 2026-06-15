import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [form, setForm]     = useState({ title: '', description: '', status: 'todo' })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setError('Title is required.'); return }
    setError('')
    setLoading(true)
    try {
      await onAdd({ ...form })
      setForm({ title: '', description: '', status: 'todo' })
    } catch {
      setError('Failed to create task.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>New task</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
        <textarea
          style={{ ...styles.input, resize: 'vertical', minHeight: '72px' }}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
        />
        <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <button style={styles.btn} type="submit" disabled={loading}>
          {loading ? 'Adding...' : '+ Add task'}
        </button>
      </form>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    marginBottom: '1.5rem',
  },
  heading: { fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' },
  error:   { color: '#dc2626', fontSize: '0.875rem', marginBottom: '0.75rem' },
  form:    { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  input: {
    padding: '0.65rem 0.9rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
  },
  btn: {
    padding: '0.65rem',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
}