import { useMutation } from '@tanstack/react-query'
import type { AuthState } from '@/types/authState'
import type { CourseValues } from '@/types/courseValues'
import { api } from '@/lib/axios'

export const useCreateCourse = (auth: AuthState) => {
  const token = auth.token
  return useMutation({
    mutationFn: async (values: CourseValues) => {
      console.log(values)
      const result = await api.post('api/courses/create', values, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      return result
    },
  })
}
