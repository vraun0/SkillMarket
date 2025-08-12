import { create } from 'zustand'
import type { AuthState } from '@/types/authState'

export const useAuth = create<AuthState>((set) => {
  const token = localStorage.getItem('token')

  return {
    token,
    user: null,
    isAuthenticated: !!token,
    login: async (token, user) => {
      localStorage.setItem('token', token)
      localStorage.setItem('admin', JSON.stringify(user.admin))
      set({ token, user, isAuthenticated: true })
    },
    logout: async () => {
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      set({ token: null, user: null, isAuthenticated: false })
    },
  }
})
