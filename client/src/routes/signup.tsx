import {
  Link,
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { z } from 'zod'
import type { signupValues } from '@/types/signupValues'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Logo } from '@/components/headerLogo'
import { useSignup } from '@/hooks/useSignup'
import { signupSchema } from '@/schemas/signupSchema'

const redirectSearchSchema = z.object({
  redirect: z.string(),
})

export const Route = createFileRoute('/signup')({
  validateSearch: redirectSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const currentPath = location.pathname
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-background dark:from-gray-900 dark:to-dark-background">
      <header className="p-4">
        <Logo />
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card dark:bg-dark-card border border-border dark:border-dark-text shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold text-foreground dark:text-dark-text">
                Create an account
              </CardTitle>
              <CardDescription className="text-muted-foreground dark:text-dark-text text-sm">
                Enter your email and password to sign up
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="p-1">
                <Signup />
              </div>
            </CardContent>

            <div className="p-4 text-center text-sm text-muted-foreground dark:text-dark-text border-t dark:border-dark-text">
              Already have an account?{' '}
              <Link
                to="/login"
                search={{
                  redirect: currentPath,
                }}
                className="text-primary dark:text-dark-primary hover:underline"
              >
                Log In
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

function submitButton() {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button
          variant="ghost"
          type="submit"
          className="bg-primary dark:bg-dark-primary text-white"
          disabled={!canSubmit || isSubmitting}
        >
          Sign Up
        </Button>
      )}
    </form.Subscribe>
  )
}

function nameField() {
  const field = useFieldContext<string>()
  return (
    <div className="space-y-1">
      <label
        htmlFor="name"
        className="block text-sm font-medium text-foreground dark:text-dark-text"
      >
        Name
      </label>
      <input
        id="name"
        placeholder="Your Name"
        type="text"
        className="w-full rounded-md border border-input dark:border-dark-text bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </div>
  )
}

function emailField() {
  const field = useFieldContext<string>()
  return (
    <div className="space-y-1">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-foreground dark:text-dark-text"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="w-full rounded-md border border-input dark:border-dark-text bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </div>
  )
}

function passwordField() {
  const field = useFieldContext<string>()
  return (
    <div className="space-y-1">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-foreground dark:text-dark-text"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="••••••••"
        className="w-full rounded-md border border-input dark:border-dark-text bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </div>
  )
}

function adminCheckboxField() {
  const field = useFieldContext<boolean>()
  return (
    <div className="flex items-center space-x-2">
      <input
        id="admin"
        type="checkbox"
        checked={field.state.value}
        onChange={(e) => field.handleChange(e.target.checked)}
        className="accent-primary dark:accent-dark-primary"
      />
      <label
        htmlFor="admin"
        className="text-sm text-foreground dark:text-dark-text"
      >
        Sign up as Admin
      </label>
    </div>
  )
}

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    nameField,
    emailField,
    passwordField,
    adminCheckboxField,
  },
  formComponents: {
    submitButton,
  },
})

const defaultSignupValues: signupValues = {
  name: '',
  email: '',
  password: '',
  admin: false,
}

function Signup() {
  const signup = useSignup()
  const { auth } = useRouteContext({ from: '/signup' })
  const search = Route.useSearch()
  const navigate = useNavigate()
  const disallowedRedirects = ['/signup', '/login', '/forgot-password']
  const redirect = search.redirect
  const safeRedirect =
    redirect && !disallowedRedirects.includes(redirect) ? redirect : '/'

  const signupForm = useAppForm({
    defaultValues: defaultSignupValues,
    validators: {
      onChange: signupSchema,
    },
    onSubmit: ({ value }) => {
      signup.mutate(value, {
        onSuccess: async (data) => {
          await auth.login(data.token, data.user)
          navigate({ to: safeRedirect })
        },
        onError: (error) => {
          console.log('Signup error:', error)
        },
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        signupForm.handleSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <signupForm.AppField
          name="name"
          children={(field) => (
            <div className="space-y-1">
              <field.nameField />
            </div>
          )}
        />
        <signupForm.AppField
          name="email"
          children={(field) => (
            <div className="space-y-1">
              <field.emailField />
            </div>
          )}
        />
        <signupForm.AppField
          name="password"
          children={(field) => (
            <div className="space-y-1">
              <field.passwordField />
            </div>
          )}
        />

        <signupForm.AppField
          name="admin"
          children={(field) => (
            <div className="space-y-1">
              <field.adminCheckboxField />
            </div>
          )}
        />
      </div>
      <signupForm.AppForm>
        <div className="pt-2 flex items-center justify-center">
          <signupForm.submitButton />
        </div>
      </signupForm.AppForm>
    </form>
  )
}
