import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (values: {
      email: string
      password: string
      admin: boolean
    }) => {
      const endpoint = values.admin ? 'api/admin/login' : 'api/user/login'
      const response = await api.post(endpoint, values)
      return response.data
    },
  })
}
