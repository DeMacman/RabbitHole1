import { motion } from 'framer-motion'

const VisionSection = () => {
  return (
    <section id="vision" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-0 rounded-full border border-[rgba(124,58,237,0.2)]"
              />

              <motion.div
                animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-8 rounded-full border border-[rgba(124,58,237,0.15)]"
              />

              <motion.div
                animate={{ rotate: 360, scale: [0.9, 1, 0.9] }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-16 rounded-full border border-[rgba(124,58,237,0.1)]"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-[#7C3AED]/20"
                  style={{
                    boxShadow:
                      '0 0 40px rgba(124,58,237,0.3), 0 0 80px rgba(124,58,237,0.2)',
                  }}
                >
                  <div className="h-12 w-12 rounded-full bg-[#7C3AED]" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display mb-6 text-4xl font-bold text-white md:text-5xl">
              Every search becomes a universe
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-[#A1A1AA]">
              Instead of opening dozens of tabs, RabbitHole lets you navigate
              knowledge visually through an infinite graph of connected ideas.
              See how concepts, people, and events weave together into a
              beautiful tapestry of understanding.
            </p>

            <div className="flex items-center space-x-2 text-[#A1A1AA]">
              <div className="h-2 w-2 rounded-full bg-[#7C3AED]" />
              <span className="text-sm">Infinite connections await</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VisionSection