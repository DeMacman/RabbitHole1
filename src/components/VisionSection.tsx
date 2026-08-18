import { motion } from 'framer-motion';

export default function VisionSection() {
  return (
    <section id="vision" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.03, 1] }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-0 rounded-full border border-forest-500/20"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1.06, 1, 1.06] }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-8 rounded-full border border-forest-500/15"
              />
              <motion.div
                animate={{ rotate: 360, scale: [0.92, 1, 0.92] }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-16 rounded-full border border-plum-400/20"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-forest-500/10 flex items-center justify-center"
                  style={{ boxShadow: '0 0 40px rgba(62,106,79,0.12), 0 0 80px rgba(62,106,79,0.06)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-forest-600" />
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
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 mb-6">
              Every search becomes a universe.
            </h2>
            <p className="text-base sm:text-lg text-navy-700/80 leading-relaxed mb-8">
              Instead of opening dozens of tabs, RabbitHole lets you navigate knowledge
              visually through an infinite graph of connected ideas. See how concepts,
              people, and events weave together into a beautiful tapestry of understanding.
            </p>
            <div className="flex items-center space-x-2 text-navy-700/70">
              <div className="w-2 h-2 rounded-full bg-forest-600" />
              <span className="text-sm">Infinite connections await</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}