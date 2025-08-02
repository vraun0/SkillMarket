import { motion } from 'framer-motion'
import { Login } from '@/components/loginButton'

export function CTA() {
  return (
    <section className="py-24 px-6 bg-background text-text dark:bg-dark-background dark:text-dark-text text-center">
      <motion.div
        className="max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold">Ready to Elevate Your Skills?</h2>
        <p className="text-lg">
          Join a vibrant marketplace of learners, creators, and professionals.
        </p>
        <div className="flex items-center justify-center">
          <Login />
        </div>
      </motion.div>
    </section>
  )
}
