import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})
function RouteComponent() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: 'email',
      password: 'password',
    },
  })

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await res.json()
      console.log('Login successful', data)

      // Store token in localStorage (or Zustand store, etc.)
      localStorage.setItem('token', data.token)

      // Redirect or update auth state here
    } catch (error) {
      console.error('Login failed:', error)
      // Optionally show error in UI
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>Please enter your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="yeahboi123" {...field} />
              </FormControl>
              <FormDescription>Please enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
