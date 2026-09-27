import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/types/user"

interface AuthContextValue {
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (patch: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = "ci-user"

const MOCK_USER: User = {
  id: "u_001",
  name: "Анна Петрова",
  email: "a.petrova@example.com",
  role: "risk_manager",
  joinedAt: "2025-03-12T09:00:00Z",
  lastActiveAt: new Date().toISOString(),
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      setUser(MOCK_USER)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER))
    }
    setIsLoading(false)
  }, [])

  const login = (u: User) => {
    setUser(u)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const updateUser = (patch: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...patch }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}