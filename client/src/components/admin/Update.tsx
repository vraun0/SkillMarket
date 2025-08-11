import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import type { CourseValues } from '@/types/courseValues'
import { courseSchema } from '@/schemas/courseSchema'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useUpdateCourse } from '@/hooks/useUpdateCourse'
import { Button } from '@/components/ui/button'
import { useRouteContext } from '@tanstack/react-router'

export function Update({ course_id }: { course_id: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-primary dark:text-dark-primary">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="text-text dark:text-dark-text">
              Update your course
            </div>
          </DialogTitle>
        </DialogHeader>
        <UpdateForm course_id={course_id} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
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
          className="bg-primary dark:bg-dark-primary"
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
        className="w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
      <MDEditor
        id="description"
        className="w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(val) => field.handleChange(val ?? '')}
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
        className="w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        className="w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {field.state.value.map((tag, idx) => (
          <span
            key={idx}
            className="bg-muted text-muted-text dark: text-dark-muted-text text-xs px-2 py-1 rounded-full border border-muted-foreground"
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
        className="w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
        className="w-full rounded-md border border-input dark:border-background bg-background dark:bg-dark-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground dark:placeholder:text-green-900 dark:text-dark-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

interface FormProps {
  course_id: string
  closeDialog: () => void
}

function UpdateForm({ course_id, closeDialog }: FormProps) {
  const [formError] = useState('')
  const { auth } = useRouteContext({ from: '/_protected/admin/home' })
  const updateCourse = useUpdateCourse(auth, course_id)

  const courseForm = useAppForm({
    defaultValues: defaultCourseValues,
    validators: {
      onChange: courseSchema,
    },
    onSubmit: ({ value }) => {
      updateCourse.mutate(value, {
        onSuccess: async (data) => {
          console.log(data)
          closeDialog()
        },
        onError: (error) => {
          console.log('Error creating course:', error)
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
