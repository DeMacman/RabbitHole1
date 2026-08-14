import { motion } from 'framer-motion'
import { Search, GitBranch, Lightbulb } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Search',
    description: 'Start with any topic, person, company, or concept that sparks your curiosity',
    gradient: 'from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-400',
    delay: 0,
  },
  {
    icon: GitBranch,
    title: 'Explore',
    description: 'Discover unexpected connections and traverse an infinite web of related ideas',
    gradient: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-400',
    delay: 0.2,
  },
  {
    icon: Lightbulb,
    title: 'Understand',
    description: 'Build your own knowledge universe and see how everything fits together',
    gradient: 'from-pink-500/20 to-pink-600/10',
    iconColor: 'text-pink-400',
    delay: 0.4,
  },
]

export default function FeatureCards() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            How it works
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Three simple steps to transform how you explore knowledge
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="relative h-full bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 hover:border-[rgba(255,255,255,0.12)] transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-[#A1A1AA] leading-relaxed">
                    {feature.description}
                  </p>

                  {index < features.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 w-6 h-6 items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#A1A1AA]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}