import {
  Link,
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { useGetCourses } from '@/hooks/useGetCourses'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_protected/user/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = useRouteContext({ from: '/_protected/user/home' })

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
    <div>
      <Header />
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome{auth.user?.name ? `, ${auth.user.name}` : ''}!
          </h1>
          <p className="text-muted-foreground max-w-md">
            You’ve successfully logged in to{' '}
            <span className="font-medium">SkillMarket</span>. Use the navigation
            above to explore your profile, settings, and more.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            You have access to <strong>{data.length}</strong> course
            {data.length > 1 ? 's' : ''}.
          </p>
        </main>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="p-4 bg-secondary shadow-md">
      <nav className="w-full flex items-center justify-between px-6">
        <div className="text-xl font-bold text-primary">
          <Link to="/">
            <span className="text-2xl text-primary">Skill</span>
            <span className="text-2xl text-green-600">Market</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link to="/user/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/user/settings" className="hover:underline">
            Settings
          </Link>
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
        className="bg-primary text-text"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  )
}
