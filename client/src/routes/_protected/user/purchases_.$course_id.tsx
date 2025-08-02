import { createFileRoute } from '@tanstack/react-router'
import Construction from '@/components/construction'

export const Route = createFileRoute('/_protected/user/purchases_/$course_id')({
  component: Construction,
})
