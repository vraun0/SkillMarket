import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/admin/profile"!</div>
}
