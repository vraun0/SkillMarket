import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export const useSignup = () => {
  return useMutation({
    mutationFn: async ({
      admin,
      ...rest
    }: {
      name: string
      email: string
      password: string
      admin: boolean
    }) => {
      const endpoint = admin
        ? 'https://skillmarket.onrender.com/api/admin/signup'
        : 'https://skillmarket.onrender.com/api/user/signup'
      const response = await api.post(endpoint, rest) // 'rest' does not include 'admin'
      return response.data
    },
  })
}
