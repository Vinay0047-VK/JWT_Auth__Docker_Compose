import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import Navbar    from '../components/Navbar'
import TaskForm  from '../components/TaskForm'
import TaskCard  from '../components/TaskCard'
import Spinner   from '../components/Spinner'

export default function Dashboard() {
  const { tasks, loading, error, fetchTasks, addTask, editTask, removeTask } = useTasks()
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchTasks(filter ? { status: filter } : {})
  }, [filter])

  return (
    <div>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.container}>

          <TaskForm onAdd={addTask} />

          <div style={styles.toolbar}>
            <h2 style={styles.heading}>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </h2>
            <select
              style={styles.filter}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          {loading ? (
            <Spinner />
          ) : tasks.length === 0 ? (
            <div style={styles.empty}>
              <p>No tasks yet. Create your first one above.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={editTask}
                onDelete={removeTask}
              />
            ))
          )}

        </div>
      </main>
    </div>
  )
}

const styles = {
  main:      { padding: '2rem 1rem' },
  container: { maxWidth: '680px', margin: '0 auto' },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  heading: { fontSize: '1rem', fontWeight: 600, color: '#374151' },
  filter: {
    padding: '0.4rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    background: '#fff',
    outline: 'none',
  },
  error: { color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem' },
  empty: {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: '#9ca3af',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
  },
}