import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ['marketplaceCourses'],
    queryFn: async () => {
      const response = await api.get('api/courses/getAll')
      return response.data
    },
  })
}
