import {
  Link,
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { z } from 'zod'
import { useState } from 'react'
import type { loginValues } from '@/types/loginValues'
import { useLogin } from '@/hooks/useLogin'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Logo } from '@/components/headerLogo'
import { loginSchema } from '@/schemas/loginSchema'

const redirectSearchSchema = z.object({
  redirect: z.string(),
})

export const Route = createFileRoute('/login')({
  validateSearch: redirectSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-background dark:from-gray-900 dark:to-dark-background">
      {/* Header */}
      <header className="p-4">
        <Logo />
      </header>

      {/* Centered Card */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card border border-border shadow-xl rounded-2xl overflow-hidden dark:border-background">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold dark:text-dark-text">
                Login to your account
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm dark:text-dark-text">
                Enter your email and password to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="p-1">
                <LoginForm />
              </div>
            </CardContent>

            <div className="p-4 text-center text-sm text-muted-foreground border-t dark:text-dark-text">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="text-primary dark:text-dark-primary hover:underline"
                search={{
                  redirect: location.pathname,
                }}
              >
                Sign Up
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
          className="bg-primary"
          disabled={!canSubmit || isSubmitting}
        >
          Submit
        </Button>
      )}
    </form.Subscribe>
  )
}

function emailField() {
  const field = useFieldContext<string>()

  return (
    <div className="space-y-1">
      <label
        className="block text-sm font-medium text-foreground dark:text-dark-text"
        htmlFor="email"
      >
        Email
      </label>
      <input
        id="email"
        placeholder="you@example.com"
        type="email"
        className="w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        className="block text-sm font-medium text-foreground dark:text-dark-text"
        htmlFor="password"
      >
        Password
      </label>
      <input
        id="password"
        placeholder="••••••••"
        type="password"
        className=" w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        Login as Admin
      </label>
    </div>
  )
}

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    emailField,
    passwordField,
    adminCheckboxField,
  },
  formComponents: {
    submitButton,
  },
})

const defaultLoginValues: loginValues = {
  email: '',
  password: '',
  admin: false,
}

function LoginForm() {
  const [formError, setFormError] = useState('')
  const login = useLogin()
  const { auth } = useRouteContext({ from: '/login' })
  const search = Route.useSearch()
  const navigate = useNavigate()

  const disallowedRedirects = ['/signup', '/login', '/forgot-password']
  const redirect = search.redirect
  const safeRedirect =
    redirect && !disallowedRedirects.includes(redirect) ? redirect : '/'

  const loginForm = useAppForm({
    defaultValues: defaultLoginValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      login.mutate(value, {
        onSuccess: async (data) => {
          await auth.login(data.token, data.user)
          navigate({ to: safeRedirect })
        },
        onError: (error) => {
          console.log('Login error:', error)
          setFormError('Invalid email or password')
        },
      })
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        loginForm.handleSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <loginForm.AppField
          name="email"
          children={(field) => (
            <div className="space-y-1">
              <field.emailField />
            </div>
          )}
        />
        <loginForm.AppField
          name="password"
          children={(field) => (
            <div className="space-y-1">
              <field.passwordField />
            </div>
          )}
        />
        <loginForm.AppField
          name="admin"
          children={(field) => (
            <div className="space-y-1">
              <field.adminCheckboxField />
            </div>
          )}
        />
      </div>

      {formError && (
        <div className="text-sm text-red-500 text-center">{formError}</div>
      )}
      <loginForm.AppForm>
        <div className="pt-2 flex items-center justify-center">
          <loginForm.submitButton />
        </div>
      </loginForm.AppForm>
    </form>
  )
}
