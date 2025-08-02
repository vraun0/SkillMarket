import { motion } from 'framer-motion'
import { WrenchIcon } from 'lucide-react'
import type { Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 12,
    },
  },
}

export default function Construction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-zinc-900 to-gray-800 text-white px-4 text-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6"
      >
        <WrenchIcon className="w-16 h-16 text-yellow-400 animate-bounce" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Page Under Construction
        </h1>
        <p className="text-lg sm:text-xl text-zinc-300 max-w-xl">
          This page is currently being built. We're working hard to bring it to
          life. Check back soon!
        </p>
        <div className="mt-8">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-2xl font-semibold transition"
          >
            Return to Home
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}
