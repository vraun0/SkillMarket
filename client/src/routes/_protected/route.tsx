import {
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
          redirect: location.href,
        },
      })
    }
  },
  component: protectedDashboard,
})

function protectedDashboard() {
  const { auth } = useRouteContext({ from: '/_protected/home' })
  const navigate = useNavigate()

  function logoutHandler() {
    auth.logout()
    navigate({ to: '/' })
  }
  return (
    <div>
      <Button onClick={logoutHandler}>Logout</Button>
      <Outlet />
    </div>
  )
}
