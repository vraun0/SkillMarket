import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/admin/updateCourse_/$course_id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/admin/updateCourse/$course_id"!</div>
}
