import { Link, useRouteContext, useNavigate } from '@tanstack/react-router'
import { Logo } from '@/components/headerLogo'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '../mode-toggle'


export function Header() {
  return (
    <header className="p-4 bg-secondary dark:bg-dark-secondary shadow-md">
      <nav className="container flex items-center justify-between mx-auto w-full max-w-screen-xl px-6 ">
        <div className="flex items-center space-x-6">
          <Logo />
          <Link
            to="/marketplace"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition"
          >
            <Button
              variant={'ghost'}
              className="bg-primary text-background dark:bg-dark-primary dark:text-text"
            >
              Marketplace
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link
            to="/user/profile"
            className="hover:underline dark:text-dark-text"
          >
            Profile
          </Link>
          <Link
            to="/user/settings"
            className="hover:underline dark:text-dark-text"
          >
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
        className="bg-primary text-background dark:bg-dark-primary dark:text-text"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  )
}
