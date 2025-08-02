import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/landing/landingHeader'
import { api } from '@/lib/axios'
import { CourseCards } from '@/components/marketplace/coursecards'
import { Toolbar } from '@/components/marketplace/toolbar'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/marketplace')({
  loader: async () => {
    const response = await api.get('api/courses/getAll')
    return response.data
  },
  pendingComponent: pendingRouteComponent,
  component: RouteComponent,
})

function RouteComponent() {
  const { courses } = Route.useLoaderData()
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'date'>('title')

  const sortedCourses = [...courses].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'title':
      default:
        return a.title.localeCompare(b.title)
    }
  })

  if (!courses || courses.length === 0) {
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
    <div className="bg-gradient-to-br from-white to-background dark:from-gray-900 dark:to-dark-background">
      <Header />
      <Toolbar value={sortBy} onChange={setSortBy} />
      <CourseCards courses={sortedCourses} />
      <Footer />
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
