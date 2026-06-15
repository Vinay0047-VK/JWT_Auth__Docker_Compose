import { useState } from 'react'

const STATUS_COLORS = {
  todo:        { bg: '#f3f4f6', color: '#374151', label: 'To do' },
  in_progress: { bg: '#eff6ff', color: '#1d4ed8', label: 'In progress' },
  done:        { bg: '#f0fdf4', color: '#15803d', label: 'Done' },
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState({ title: task.title, description: task.description, status: task.status })
  const [loading, setLoading] = useState(false)

  const badge = STATUS_COLORS[task.status] || STATUS_COLORS.todo

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    setLoading(true)
    try {
      await onEdit(task.id, form)
      setEditing(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return
    await onDelete(task.id)
  }

  if (editing) {
    return (
      <div style={styles.card}>
        <input
          style={styles.input}
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          style={{ ...styles.input, resize: 'vertical', minHeight: '60px', marginTop: '0.5rem' }}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <select
          style={{ ...styles.input, marginTop: '0.5rem' }}
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
          <button style={styles.saveBtn} onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button style={styles.cancelBtn} onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <h3 style={styles.title}>{task.title}</h3>
        <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
          {badge.label}
        </span>
      </div>
      {task.description && (
        <p style={styles.desc}>{task.description}</p>
      )}
      <div style={styles.actions}>
        <button style={styles.editBtn} onClick={() => setEditing(true)}>Edit</button>
        <button style={styles.deleteBtn} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '10px',
    padding: '1.1rem 1.25rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    marginBottom: '0.75rem',
  },
  top:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' },
  title: { fontSize: '0.95rem', fontWeight: 600, flex: 1 },
  badge: { fontSize: '0.75rem', fontWeight: 500, padding: '0.2rem 0.65rem', borderRadius: '999px', whiteSpace: 'nowrap' },
  desc:  { marginTop: '0.4rem', fontSize: '0.875rem', color: '#555', lineHeight: 1.5 },
  actions: { display: 'flex', gap: '0.5rem', marginTop: '0.75rem' },
  editBtn:   { padding: '0.3rem 0.75rem', fontSize: '0.8rem', border: '1px solid #d1d5db', borderRadius: '6px', background: 'transparent', color: '#374151' },
  deleteBtn: { padding: '0.3rem 0.75rem', fontSize: '0.8rem', border: '1px solid #fecaca', borderRadius: '6px', background: 'transparent', color: '#dc2626' },
  input: {
    padding: '0.6rem 0.8rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.9rem',
    width: '100%',
    outline: 'none',
  },
  saveBtn:   { padding: '0.4rem 1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500 },
  cancelBtn: { padding: '0.4rem 1rem', background: 'transparent', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.85rem', color: '#374151' },
}