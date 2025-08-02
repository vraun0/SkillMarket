import { motion } from 'framer-motion'
import { CourseCard } from '../courseCard'
import type { CourseValuesWithId } from '@/types/courseValues'

type CourseCardsProps = {
  courses: Array<CourseValuesWithId>
}

export function CourseCards({ courses }: CourseCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {courses.map((course, index) => (
        <motion.div
          key={course._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        >
          <CourseCard className="" course={course} />
        </motion.div>
      ))}
    </div>
  )
}
