import {
  Link,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'


export function Header() {
  return (
    <header className="p-4 bg-secondary dark:text-dark-text dark:bg-dark-secondary shadow-md">
      <nav className="container flex items-center justify-between mx-auto w-full max-w-screen-xl px-6 ">
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
