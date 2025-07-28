import { Link } from '@tanstack/react-router'
import { Logo } from './headerLogo'
import { Button } from '@/components/ui/button'
import { Login } from '@/components/loginButton'

export function Header() {
  return (
    <header className="bg-secondary shadow-sm py-4">
      <nav className="container flex items-center justify-between mx-auto w-full max-w-screen-xl px-6 ">
        <div className="flex items-center space-x-6">
          <Logo />

          <Link
            to="/"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition"
          >
            <Button variant={'ghost'} className="bg-primary text-background">
              Home
            </Button>
          </Link>
          <Link
            to="/marketplace"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition"
          >
            <Button variant={'ghost'} className="bg-primary text-background">
              Marketplace
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Login />
        </div>
      </nav>
    </header>
  )
}
