import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { User } from '../types'
import * as authService from '../services/auth'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => { ok: boolean; message: string }
  register: (name: string, email: string, password: string) => { ok: boolean; message: string }
  logout: () => void
  refresh: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser())

  const refresh = useCallback(() => {
    setUser(authService.getCurrentUser())
  }, [])

  const login = useCallback((email: string, password: string) => {
    const result = authService.login(email, password)
    if (result.ok) setUser(authService.getCurrentUser())
    return result
  }, [])

  const register = useCallback((name: string, email: string, password: string) => {
    const result = authService.register(name, email, password)
    if (result.ok) setUser(authService.getCurrentUser())
    return result
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return ctx
}
