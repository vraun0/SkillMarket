import { createFileRoute, redirect } from '@tanstack/react-router'
import { Header } from '@/components/landingHeader'
import { Login } from '@/components/loginButton'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    console.log('context.auth in index route', context.auth)
    if (context.auth.isAuthenticated) {
      if (context.auth.user?.admin) {
        throw redirect({
          to: '/admin/home',
        })
      }
      if (!context.auth.user?.admin) {
        throw redirect({
          to: '/user/home',
        })
      }
    }
  },
  component: App,
})

function App() {
  return (
    <div className="min-h-screen  flex flex-col bg-background dark:bg-dark-background">
      <Header />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4">
        <section className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text dark:text-dark-text">
            Discover and Share Skills on{' '}
            <span className="text-primary">Skill</span>
            <span className="text-green-600">Market</span>
          </h1>
          <p className="text-muted-foreground text-lg text-text dark:text-dark-text">
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
