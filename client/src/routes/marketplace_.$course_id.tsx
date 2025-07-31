import { createFileRoute } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import { api } from '@/lib/axios'
import { CourseCard } from '@/components/courseCard'

export const Route = createFileRoute('/marketplace_/$course_id')({
  loader: async ({ params }) => {
    const response = await api.post('api/courses/getCourse', {
      _id: params.course_id,
    })
    return response.data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { course } = Route.useLoaderData()
  return (
    <div className="bg-background dark:bg-dark-background grid grid-cols-3 h-full">
      {/* Left Side: Scrollable content */}
      <div className="col-span-2 overflow-y-auto">
        <header className="bg-secondary dark:bg-dark-secondary text-text dark:text-dark-text p-6 border-b-1 text-5xl">
          {course.title}
        </header>
        <div className="pt-8 pl-6 pr-20 prose prose-headings:scroll-mt-20 prose-img:rounded-lg max-w-none text-text dark:text-dark-text">
          <ReactMarkdown>{course.description}</ReactMarkdown>
        </div>
      </div>

      {/* Right Side: Sticky card */}
      <div className="bg-background dark:bg-dark-background flex flex-col">
        <div className="bg-secondary dark:bg-dark-secondary h-[50px]"></div>
        <div className="sticky top-10">
          <CourseCard className="border-0" key={course._id} course={course} />
        </div>
      </div>
    </div>
  )
}
