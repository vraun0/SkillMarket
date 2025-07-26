import {
  Link,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    console.log(
      'context.auth.isAuthenticated in index route',
      context.auth.isAuthenticated,
    )
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/home',
      })
    }
  },
  component: App,
})

function Login() {
  const currentPath = location.pathname + location.search

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
          className="bg-primary text-white text-base hover:bg-primary/90 transition"
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
          className="bg-background text-primary text-base hover:bg-primary/10 transition"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  )
}
function Header() {
  return (
    <header className="p-4 bg-secondary shadow-md">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tight">
          <Link to="/" className="hover:text-blue-600 transition">
            <span className="text-primary">Skill</span>
            <span className="text-green-600">Market</span>
          </Link>
        </div>
        <Login />
      </nav>
    </header>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4">
        <section className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Discover and Share Skills on{' '}
            <span className="text-primary">Skill</span>
            <span className="text-green-600">Market</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A marketplace to connect learners, creators, and professionals. Sign
            up to showcase your talent or find the help you need.
          </p>
          <div className="flex justify-center">
            <Login />
          </div>
        </section>
      </main>

      {/* Optional Footer */}
      <footer className="text-center text-sm text-muted-foreground p-4 border-t">
        © {new Date().getFullYear()} SkillMarket. All rights reserved.
      </footer>
    </div>
  )
}
