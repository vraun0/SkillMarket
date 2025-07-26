import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  courseIds: Array<string>
  admin: true | false
}

export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: true | false
  login: (token: string, user: User) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => {
  const token = localStorage.getItem('token')

  return {
    token,
    user: null,
    isAuthenticated: !!token,
    login: async (token, user) => {
      localStorage.setItem('token', token)
      set({ token, user, isAuthenticated: true })
    },
    logout: async () => {
      localStorage.removeItem('token')
      set({ token: null, user: null, isAuthenticated: false })
    },
  }
})
