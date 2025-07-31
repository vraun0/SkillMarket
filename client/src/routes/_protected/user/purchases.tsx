import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user/purchases')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/user/purchases"!</div>
}
