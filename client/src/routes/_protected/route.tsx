import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context, location }) => {
    console.log('isAuthenticated in route', context.auth.isAuthenticated)
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname + location.search,
        },
      })
    }
  },
  component: protectedRoutes,
})

function protectedRoutes() {
  return (
    <div bg-background>
      <Header />
      <Outlet />
    </div>
  )
}

function Header() {
  return (
    <header className="p-4 bg-secondary shadow-md">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-600 transition">
            <span className="text-primary">Skill</span>
            <span className="text-green-600">Market</span>
          </Link>
        </div>
        <div>
          <Logout />
        </div>
      </nav>
    </header>
  )
}
function Logout() {
  const { auth } = useRouteContext({ from: '/_protected/home' })
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
