import { Link, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({  context  }) => {
    console.log("context.auth.isAuthenticated in index route", context.auth.isAuthenticated)
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/home',
      })
    }
  },
  component: App,
})

function App() {
  return (
    <div>
      <Link
        to="/login"
        search={{
          redirect: location.href,
        }}
      >
        <button>Login</button>
      </Link>
    </div>
  )
}
