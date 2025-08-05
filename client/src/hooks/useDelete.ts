import { useMutation } from '@tanstack/react-query'
import type { AuthState } from '@/types/authState'
import { api } from '@/lib/axios'

export const useDelete = (auth: AuthState) => {
  const token = auth.token
  return useMutation({
    mutationFn: async (course_id: string) => {
      const response = await api.delete(
        `https://skillmarket.onrender.com/api/courses/delete/${course_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data
    },
  })
}
