import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthState } from '../stores/auth'

import Header from '../components/Header'

interface RootContext {
  auth : AuthState;
}

export const Route = createRootRouteWithContext<RootContext>() ({
  component: () => (
    <>
      <Header />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
