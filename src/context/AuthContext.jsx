
import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

const MOCK_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@hms.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'Dr. Smith', email: 'doctor@hms.com', password: 'doctor123', role: 'doctor' },
  { id: '3', name: 'Jane Doe', email: 'reception@hms.com', password: 'recep123', role: 'receptionist' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hms_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback((email, password) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )
    if (!found) throw new Error('Invalid credentials')
    const { password: _, ...safeUser } = found
    localStorage.setItem('hms_user', JSON.stringify(safeUser))
    setUser(safeUser)
    return safeUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('hms_user')
    setUser(null)
  }, [])

  const hasRole = useCallback(
    (...roles) => user && roles.includes(user.role),
    [user]
  )

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}
