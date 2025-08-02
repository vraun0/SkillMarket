import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Login } from '@/components/loginButton'

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  return (
    <main className="min-h-screen relative flex items-center justify-center px-6 ">
      <motion.section
        ref={ref}
        style={{ scale }}
        className="max-w-3xl text-center space-y-8"
      >
        <motion.h1
          className="text-6xl font-extrabold tracking-tight leading-tight dark:text-dark-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover and Share Skills on{' '}
          <motion.span
            className="text-primary"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
          >
            Skill
          </motion.span>
          <motion.span
            className="text-green-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
          >
            Market
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-muted-text text-xl dark:text-dark-muted-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          A marketplace to connect learners, creators, and professionals. Sign
          up to showcase your talent or find the help you need.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Login />
        </motion.div>
      </motion.section>
    </main>
  )
}
