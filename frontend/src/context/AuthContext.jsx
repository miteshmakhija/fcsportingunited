import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sua_token')
    if (token) {
      authApi
        .me()
        .then((r) => setUser(r.data))
        .catch(() => {
          localStorage.removeItem('sua_token')
          localStorage.removeItem('sua_role')
          localStorage.removeItem('sua_user_id')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const { data } = await authApi.login(email, password)
    localStorage.setItem('sua_token', data.access_token)
    localStorage.setItem('sua_role', data.role)
    localStorage.setItem('sua_user_id', data.user_id)
    const me = await authApi.me()
    setUser(me.data)
    return me.data
  }

  const logout = () => {
    localStorage.removeItem('sua_token')
    localStorage.removeItem('sua_role')
    localStorage.removeItem('sua_user_id')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

