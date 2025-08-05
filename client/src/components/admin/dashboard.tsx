import { Link, useRouteContext } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import type { AuthState } from '@/types/authState'
import type { CourseValuesWithId } from '@/types/courseValues'
import { useGetCourses } from '@/hooks/useGetCourses'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDelete } from '@/hooks/useDelete'
import { Button } from '@/components/ui/button'

export function Dashboard() {
  const { auth } = useRouteContext({ from: '/_protected/admin/home' })

  const { isPending, isError, data, refetch } = useGetCourses(auth)

  if (isPending) return <Pending />
  if (isError) return <Error />

  return <Success auth={auth} courseList={data.courseList} refetch={refetch} />
}

interface SuccessProps {
  auth: AuthState
  courseList: Array<CourseValuesWithId>
  refetch: () => void
}

function Success({ auth, courseList, refetch }: SuccessProps) {
  const name = auth.user?.name || 'there'

  return (
    <div className="min-h-screen px-4 md:px-12 py-8 space-y-12">
      <motion.h1
        className="text-4xl font-bold tracking-tight text-text dark:text-dark-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome, {name}!
      </motion.h1>

      {/* Your Courses */}
      <Section title="Your created courses">
        {courseList.length === 0 ? (
          <p className="text-muted-text dark:text-dark-muted-text">
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <CardGrid>
            {courseList.map((course) => (
              <CourseCard key={course._id} course={course} refetch={refetch} />
            ))}
          </CardGrid>
        )}
      </Section>

      <motion.div
        className="bg-background dark:bg-dark-background text-text dark:text-dark-text rounded-2xl p-6 shadow-lg text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-2">Looking to create more?</h2>
        <p className="mb-4 text-muted-text dark:text-dark-muted-text">
          Contribute further to our vibrant community of creators and head on to
          the create portal
        </p>
        <Link
          to="/admin/createCourse"
          className="inline-block px-6 py-3 bg-primary dark:bg-dark-primary text-background dark:text-dark-background font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          Create your course
        </Link>
      </motion.div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-semibold text-text dark:text-dark-text">
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  )
}

function CourseCard({
  course,
  refetch,
}: {
  course: CourseValuesWithId
  refetch: () => void
}) {
  return (
    <motion.div
      className="bg-background dark:bg-dark-background p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
        {course.title}
      </h3>
      <p className="text-sm text-muted-text dark:text-dark-muted-text line-clamp-3">
        {course.description}
      </p>
      <div className="flex justify-between mt-4">
        <Link to={`/admin/updateCourse`}>
          <Button
            variant="ghost"
            className="text-primary dark:text-dark-primary"
          >
            Update
          </Button>
        </Link>
        <Delete course_id={course._id} refetch={refetch} />
      </div>
    </motion.div>
  )
}

function Delete({
  course_id,
  refetch,
}: {
  course_id: string
  refetch: () => void
}) {
  const { auth } = useRouteContext({ from: '/_protected/admin/home' })
  const deleteMutation = useDelete(auth)

  const deleteHandler = () => {
    deleteMutation.mutate(course_id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-primary dark:text-dark-primary">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-text dark:text-dark-text">
              Are you absolutely sure?
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="text-muted-text dark:text-dark-muted-text">
              This action cannot be undone. This will permanently delete your
              course and remove your data from our servers.
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
              onClick={deleteHandler}
              className="bg-red-600 text-dark-text w-20"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Pending() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-secondary dark:text-dark-secondary space-y-6">
      <motion.h1
        className="text-xl md:text-2xl font-semibold tracking-tight"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading Courses
      </motion.h1>

      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-4 h-4 bg-secondary text-sm dark:bg-dark-secondary rounded-full"
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
function Error() {
  return (
    <div className="min-h-screen flex items-center tracking-tight justify-around text-6xl text-text dark:text-dark-text">
      ERROR fetching Courses
    </div>
  )
}
