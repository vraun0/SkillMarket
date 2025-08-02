import { createFileRoute, redirect } from '@tanstack/react-router'
import { Header } from '@/components/landing/landingHeader'
import { Hero } from '@/components/landing/hero'
import { Footer } from '@/components/landing/footer'
import { Features } from '@/components/landing/features'
import { CTA } from '@/components/landing/cta'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    console.log('context.auth in index route', context.auth)
    if (context.auth.isAuthenticated) {
      if (context.auth.user?.admin) {
        throw redirect({
          to: '/admin/home',
        })
      }
      if (!context.auth.user?.admin) {
        throw redirect({
          to: '/user/home',
        })
      }
    }
  },
  component: App,
})

function App() {
  return (
    <div className="min-h-screen  flex flex-col bg-gradient-to-br from-white to-background dark:from-gray-900 dark:to-dark-background">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}
