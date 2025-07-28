import type { User } from '@/types/user'

export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: true | false
  login: (token: string, user: User) => void
  logout: () => void
}
