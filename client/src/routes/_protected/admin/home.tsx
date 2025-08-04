import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/admin/header'
import { Dashboard } from '@/components/admin/dashboard'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/_protected/admin/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-gradient-to-br from-white to-background dark:from-gray-900 dark:to-dark-background">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  )
}
