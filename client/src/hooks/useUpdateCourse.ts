import { useMutation } from '@tanstack/react-query'
import type { AuthState } from '@/types/authState'
import type { CourseValues } from '@/types/courseValues'
import { api } from '@/lib/axios'

export const useUpdateCourse = (auth: AuthState, course_id : string) => {
  const token = auth.token
  return useMutation({
    mutationFn: async (values: CourseValues) => {
      console.log(values)
      const result = await api.put(
        `https://skillmarket.onrender.com/api/courses/update/${course_id}`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return result
    },
  })
}
