import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks'

export function useTasks() {
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getTasks(params)
      setTasks(data.results ?? data)
    } catch (err) {
      setError('Failed to load tasks.')
      toast.error('Could not load tasks. Try refreshing.')
    } finally {
      setLoading(false)
    }
  }, [])

  const addTask = async (data) => {
    const { data: newTask } = await createTask(data)
    setTasks((prev) => [newTask, ...prev])
    toast.success('Task created')
  }

  const editTask = async (id, data) => {
    const { data: updated } = await updateTask(id, data)
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    toast.success('Task updated')
  }

  const removeTask = async (id) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
    toast.success('Task deleted')
  }

  return { tasks, loading, error, fetchTasks, addTask, editTask, removeTask }
}