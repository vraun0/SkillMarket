import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function Login() {
  const currentPath = location.pathname

  return (
    <div className="flex gap-2">
      <Link
        to="/login"
        search={{
          redirect: currentPath,
        }}
      >
        <Button
          variant="ghost"
          className="bg-primary text-background dark:bg-dark-primary dark:text-dark-background text-base hover:bg-primary/90 transition"
        >
          Login
        </Button>
      </Link>
      <Link
        to="/signup"
        search={{
          redirect: currentPath,
        }}
      >
        <Button
          variant="ghost"
          className="bg-background text-primary dark:bg-dark-background dark:text-dark-primary text-base hover:bg-primary/10 transition"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  )
}
