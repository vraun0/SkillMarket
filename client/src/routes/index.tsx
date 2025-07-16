import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
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
