import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$course_id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/course/$course_id"!</div>
}
