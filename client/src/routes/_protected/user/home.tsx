import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/user/header'
import { Dashboard } from '@/components/user/dashboard'

export const Route = createFileRoute('/_protected/user/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-gradient-to-br from-white to-background dark:from-gray-900 dark:to-dark-background">
      <Header />
      <Dashboard />
    </div>
  )
}
