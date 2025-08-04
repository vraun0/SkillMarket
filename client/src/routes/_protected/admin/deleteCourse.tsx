import { createFileRoute } from '@tanstack/react-router'
import Construction from '@/components/construction'

export const Route = createFileRoute('/_protected/admin/deleteCourse')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Construction />
}
