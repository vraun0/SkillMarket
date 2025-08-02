import {
  Link,
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import type { CourseValuesWithId } from '@/types/courseValues'
import { useGetCourses } from '@/hooks/useGetCourses'
import { Button } from '@/components/ui/button'
import { CourseCard } from '@/components/courseCard'
import { ModeToggle } from '@/components/mode-toggle'

export const Route = createFileRoute('/_protected/admin/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = useRouteContext({ from: '/_protected/admin/home' })

  const { isPending, isError, data, error } = useGetCourses(auth)

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
    <div className="bg-background dark:bg-dark-background text-text dark:text-dark-tex">
      <Header />
      <div className="p-4 text-3xl">Your Courses</div>
      <div className="grid  grid-cols-3 gap-6 p-8">
        {data.courseList.map((course: CourseValuesWithId) => (
          <CourseCard className="" key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}
function Header() {
  return (
    <header className="p-4 bg-secondary dark:text-dark-text dark:bg-dark-secondary shadow-md">
      <nav className="container flex items-center justify-between mx-auto w-full max-w-screen-xl px-6 ">
        {/* Left section: Logo and Create */}
        <div className="text-xl flex items-center font-bold space-x-4">
          <Link to="/" className="flex items-center ">
            <span className="text-2xl text-primary">Skill</span>
            <span className="text-2xl text-green-600">Market</span>
            <span className="pb-2 text-xs dark:text-dark-text font-semibold rounded-full bg-destructive text-text">
              ADMIN
            </span>
          </Link>
          <span className="font-light text-xl">|</span>
          <Link to="/admin/createCourse">
            <Button
              variant="ghost"
              className="bg-primary text-background dark:bg-dark-primary dark:text-dark-background"
            >
              Create
            </Button>
          </Link>
        </div>

        {/* Right section: Profile / Settings / Logout */}
        <div className="flex items-center gap-4 text-sm">
          <Link to="/admin/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/admin/settings" className="hover:underline">
            Settings
          </Link>
          <div>
            <ModeToggle />
          </div>
          <Logout />
        </div>
      </nav>
    </header>
  )
}

function Logout() {
  const { auth } = useRouteContext({ from: '/_protected' })
  const navigate = useNavigate()

  async function logoutHandler() {
    await auth.logout()
    navigate({ to: '/' })
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="bg-primary text-background dark:bg-dark-primary dark:text-dark-background"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  )
}
