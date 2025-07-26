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
      <nav className="w-full flex items-center justify-between px-6">
        <div className="text-xl font-bold text-primary">
          <Link to="/">
            <span className="text-primary">Skill</span>
            <span className="text-green-600">Market</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link to="/_protected/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/_protected/settings" className="hover:underline">
            Settings
          </Link>
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
