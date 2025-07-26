import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export const useSignup = () => {
  return useMutation({
    mutationFn: async (values: {
      name: string
      email: string
      password: string
    }) => {
      const response = await api.post('api/user/signup', values)
      return response.data
    },
  })
}
