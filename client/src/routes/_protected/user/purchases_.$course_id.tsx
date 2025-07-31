import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user/purchases_/$course_id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/user/purchases_/$course_id"!</div>
}
