import { createFileRoute } from '@tanstack/react-router'
import { useGetAllCourses } from '@/hooks/useGetAllCourses'

import { Header } from '@/routes/index'

export const Route = createFileRoute('/marketplace')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, isError, data, error } = useGetAllCourses()
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading courses...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading courses: {error?.message}</p>
      </div>
    )
  }

  console.log(data)

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No courses available.</p>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div>
        <p className="mt-4 text-sm text-muted-foreground">
          You have access to <strong>{data.length}</strong> course
          {data.length > 1 ? 's' : ''} {JSON.stringify(data.courses)}.
        </p>
      </div>
      <div>Hello "/marketplace"!</div>)
    </div>
  )
}
