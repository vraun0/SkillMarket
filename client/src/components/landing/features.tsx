import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const features = [
  {
    title: 'Connect with Experts',
    description:
      'Find skilled professionals and mentors from various industries, ready to help you grow.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Monetize Your Skills',
    description:
      'Turn your passion into profit by offering services, mentorship, or digital products.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
  {
    title: 'Flexible Collaboration',
    description:
      'Engage in short- or long-term projects with seamless communication and transparency.',
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
  },
]

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <motion.h2
          className="text-4xl font-bold tracking-tight text-text dark:text-dark-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span className="text-primary">Skill</span>
          <span className="text-green-600">Market</span>?
        </motion.h2>

        <div className="grid gap-10 grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-background dark:bg-dark-background shadow-xl text-left space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div>{feature.icon}</div>
              <h3 className="text-xl font-semibold text-text dark:text-dark-text">
                {feature.title}
              </h3>
              <p className="text-muted-text dark:text-dark-muted-text">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
