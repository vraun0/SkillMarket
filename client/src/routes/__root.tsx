import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthState } from '../stores/auth'

interface RootContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
