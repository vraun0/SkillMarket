import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context, location }) => {
    console.log('isAuthenticated in route', context.auth.isAuthenticated)
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      })
    }
  },
  component: protectedRoutes,
})

function protectedRoutes() {
  return (
    <div className="bg-background">
      <Outlet />
    </div>
  )
}
