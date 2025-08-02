import { createFileRoute } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { api } from '@/lib/axios'
import { CourseCard } from '@/components/courseCard'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/marketplace_/$course_id')({
  loader: async ({ params }) => {
    const response = await api.post('api/courses/getCourse', {
      _id: params.course_id,
    })
    return response.data
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { course } = Route.useLoaderData()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const, // or omit 'as const' if using Variants type
        stiffness: 100,
      },
    },
  }

  return (
    <div className="bg-gradient-to-br from-white to-background dark:from-gray-900 dark:to-dark-background">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side: Scrollable content */}
        <div className="col-span-1 md:col-span-2 overflow-y-auto p-8 md:p-12">
          <motion.header
            className="pb-4 border-b border-white"
            variants={itemVariants}
          >
            <h1 className="text-5xl font-bold text-text dark:text-dark-text font-heading">
              {course.title}
            </h1>
          </motion.header>

          <motion.div
            className="pt-8 prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-text dark:prose-headings:text-dark-text prose-p:font-body prose-p:text-muted-text dark:prose-p:text-dark-muted-text prose-a:text-accent dark:prose-a:text-dark-accent prose-strong:text-text dark:prose-strong:text-dark-text"
            variants={itemVariants}
          >
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </motion.div>
        </div>

        {/* Right Side: Sticky card */}
        <div className="col-span-1 flex flex-col items-center p-8">
          <motion.div
            className="sticky top-10 w-full"
            variants={itemVariants}
            whileHover={{
              y: -5,
              scale: 1.02,
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CourseCard className="border-0" key={course._id} course={course} />
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  )
}
