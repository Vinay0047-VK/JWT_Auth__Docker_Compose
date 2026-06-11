import { createContext, useState, useEffect } from 'react'
import { login as loginApi, logout as logoutApi, getMe } from '../api/auth'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) {
      setLoading(false)
      return
    }
    getMe()
      .then(({ data }) => setUser(data))
      .catch(() => localStorage.clear())
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { data } = await loginApi({ email, password })
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    const me = await getMe()
    setUser(me.data)
  }

  const logout = async () => {
    try {
      const refresh = localStorage.getItem('refresh')
      await logoutApi(refresh)
    } finally {
      localStorage.clear()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}