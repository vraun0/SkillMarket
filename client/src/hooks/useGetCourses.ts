import { useQuery } from '@tanstack/react-query'
import type { AuthState } from '@/types/authState'
import { api } from '@/lib/axios'

export const useGetCourses = (auth: AuthState) => {
  const token = auth.token

  return useQuery({
    queryKey: ['allCourses', token],
    queryFn: async () => {
      const response = await api.get('api/courses/get', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    enabled: !!token,
  })
}
