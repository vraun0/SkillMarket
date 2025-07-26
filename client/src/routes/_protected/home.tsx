import { createFileRoute, useRouteContext } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = useRouteContext({ from: '/_protected/home' })

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome{auth.user?.name ? `, ${auth.user.name}` : ''}!
        </h1>
        <p className="text-muted-foreground max-w-md">
          You’ve successfully logged in to{' '}
          <span className="font-medium">SkillMarket</span>. Use the navigation
          above to explore your profile, settings, and more.
        </p>
      </main>
    </div>
  )
}
