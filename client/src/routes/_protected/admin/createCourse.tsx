import {
  Link,
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { z } from 'zod'
import { useState } from 'react'
import type { CourseValues } from '@/types/courseValues'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCreateCourse } from '@/hooks/useCreateCourse'
import { courseSchema } from '@/schemas/courseSchema'

export const Route = createFileRoute('/_protected/admin/createCourse')({
  component: RouteComponent,
})
function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="p-4">
        <div className="text-2xl font-bold text-primary">
          <Link to="/">
            <span className="text-primary">Skill</span>
            <span className="text-green-600">Market</span>
          </Link>
        </div>
      </header>

      {/* Centered Card */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Card className="bg-card border border-border shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold">
                Create your course
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Enter the course details to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="p-1">
                <Login />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const { fieldContext, formContext, useFormContext, useFieldContext } =
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

// Text input for title, instructor, thumbnail
export function titleField() {
  const field = useFieldContext<string>()
  return (
    <>
      <input
        id="title"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Enter course title"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {!field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </>
  )
}

export function descriptionField() {
  const field = useFieldContext<string>()
  return (
    <>
      <textarea
        id="description"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Enter course description"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {!field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </>
  )
}

export function instructorField() {
  const field = useFieldContext<string>()
  return (
    <>
      <input
        id="instructor"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Enter instructor name"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {!field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </>
  )
}

export function tagsField() {
  const field = useFieldContext<Array<string>>()
  const [inputValue, setInputValue] = useState('')

  const handleAddTag = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !field.state.value.includes(trimmed)) {
      field.handleChange([...field.state.value, trimmed])
    }
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div>
      <input
        id="tags"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press comma or space"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {field.state.value.map((tag, idx) => (
          <span
            key={idx}
            className="bg-muted text-foreground text-xs px-2 py-1 rounded-full border border-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {!field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </div>
  )
}

export function priceField() {
  const field = useFieldContext<number>()

  return (
    <>
      <input
        id="price"
        type="number"
        value={field.state.value ?? ''}
        onChange={(e) => {
          const parsed = parseFloat(e.target.value)
          field.handleChange(isNaN(parsed) ? 0 : parsed)
        }}
        onBlur={field.handleBlur}
        placeholder="Enter course price"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {!field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </>
  )
}

export function thumbnailField() {
  const field = useFieldContext<string>()
  return (
    <>
      <input
        id="thumbnail"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="https://example.com/image.png"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />

      {!field.state.meta.isValid && (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.errors.join(',')}
        </p>
      )}
    </>
  )
}
const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    titleField,
    descriptionField,
    instructorField,
    tagsField,
    priceField,
    thumbnailField,
  },
  formComponents: {
    submitButton,
  },
})

const defaultCourseValues: CourseValues = {
  title: '',
  description: '',
  instructor: '',
  tags: [] as Array<string>,
  price: 0,
  thumbnail: '',
}

function Login() {
  const [formError, setFormError] = useState('')
  const navigate = useNavigate({ from: '/admin/createCourse' })
  const { auth } = useRouteContext({ from: '/_protected/admin/createCourse' })
  const createCourse = useCreateCourse(auth)

  const courseForm = useAppForm({
    defaultValues: defaultCourseValues,
    validators: {
      onChange: courseSchema,
    },
    onSubmit: ({ value }) => {
      createCourse.mutate(value, {
        onSuccess: async (data) => {
          console.log(data)
          navigate({ to: '/admin/home' })
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
        courseForm.handleSubmit()
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <courseForm.AppField
          name="title"
          children={(field) => (
            <div className="space-y-1">
              <field.titleField />
            </div>
          )}
        />
        <courseForm.AppField
          name="description"
          children={(field) => (
            <div className="space-y-1">
              <field.descriptionField />
            </div>
          )}
        />
        <courseForm.AppField
          name="instructor"
          children={(field) => (
            <div className="space-y-1">
              <field.instructorField />
            </div>
          )}
        />
        <courseForm.AppField
          name="tags"
          children={(field) => (
            <div className="space-y-1">
              <field.tagsField />
            </div>
          )}
        />
        <courseForm.AppField
          name="price"
          children={(field) => (
            <div className="space-y-1">
              <field.priceField />
            </div>
          )}
        />
        <courseForm.AppField
          name="thumbnail"
          children={(field) => (
            <div className="space-y-1">
              <field.thumbnailField />
            </div>
          )}
        />
      </div>

      {formError && (
        <div className="text-sm text-red-500 text-center">{formError}</div>
      )}
      <courseForm.AppForm>
        <div className="pt-2 flex items-center justify-center">
          <courseForm.submitButton />
        </div>
      </courseForm.AppForm>
    </form>
  )
}
