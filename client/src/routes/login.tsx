import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { z } from 'zod'
import { useEffect } from 'react'
import { useLogin } from '@/hooks/useLogin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const redirectSearchSchema = z.object({
  redirect: z.string(),
})

export const Route = createFileRoute('/login')({
  validateSearch: redirectSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Login />
    </div>
  )
}

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

function emailField() {
  const field = useFieldContext<string>()
  return (
    <label>
      <Input
        placeholder="Email"
        type="email"
        className="text-sm"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  )
}

function passwordField() {
  const field = useFieldContext<string>()
  return (
    <label>
      <Input
        placeholder="Password"
        type="password"
        className="text-sm"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  )
}

function submitButton() {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button type="submit" disabled={!canSubmit || isSubmitting}>
          Submit
        </Button>
      )}
    </form.Subscribe>
  )
}

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    emailField,
    passwordField,
  },
  formComponents: {
    submitButton,
  },
})

interface loginValues {
  email: string
  password: string
}

const defaultLoginValues: loginValues = {
  email: '',
  password: '',
}

const loginSchema = z.object({
  email: z.string().email().min(3).max(30),
  password: z.string().min(3).max(30),
})

function Login() {
  const login = useLogin()
  const { auth } = useRouteContext({ from: '/login' })
  const search = Route.useSearch()
  const redirect = search.redirect ?? '/home'
  const navigate = useNavigate()

  const loginForm = useAppForm({
    defaultValues: defaultLoginValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      login.mutate(value, {
        onSuccess: async (data) => {
          await auth.login(data.token, data.user)
          navigate({ to: '/home' })
        },
        onError: (error) => {
          console.log('Login error:', error)
        },
      })
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          loginForm.handleSubmit()
        }}
      >
        <loginForm.AppField
          name="email"
          children={(field) => <field.emailField />}
        />
        <loginForm.AppField
          name="password"
          children={(field) => <field.passwordField />}
        />
        <loginForm.AppForm>
          <loginForm.submitButton />
        </loginForm.AppForm>
      </form>
    </div>
  )
}
