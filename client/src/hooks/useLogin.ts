import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await api.post('api/user/login',  values )
      return response.data
    },
  })
}
