import { createFileRoute } from '@tanstack/react-router'
import type { CourseValuesWithId } from '@/types/courseValues'
import { Header } from '@/components/landingHeader'
import { CourseCard } from '@/components/courseCard'
import { api } from '@/lib/axios'

export const Route = createFileRoute('/marketplace')({
  loader: async () => {
    const response = await api.get('api/courses/getAll')
    return response.data
  },
  pendingComponent: pendingRouteComponent,
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  console.log(data)

  if (!data || data.length === 0) {
    return (
      <div>
        <Header />
        <div className="bg-background dark:bg-dark-background min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">No courses available.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="grid bg-background dark:bg-dark-background grid-cols-3 gap-6 p-8">
        {data.courses.map((course: CourseValuesWithId) => (
          <CourseCard className="" key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}
function pendingRouteComponent() {
  return (
    <div className="bg-background dark:bg-dark-background">
      <Header />
      <div>Loading Courses ...</div>
    </div>
  )
}
