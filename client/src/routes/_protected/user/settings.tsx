import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/settings"!</div>
}
