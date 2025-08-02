import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

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
          Explore a vibrant marketplace of created by experts, creators, and
          professionals.
        </p>
        <div className="flex items-center justify-center">
          <Link
            to="/marketplace"
            className="text-base font-medium text-muted-foreground hover:text-foreground transition"
          >
            <Button
              variant={'ghost'}
              className="bg-primary text-background dark:bg-dark-primary dark:text-dark-background"
            >
              Marketplace
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
