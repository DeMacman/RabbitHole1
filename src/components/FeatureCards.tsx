import { motion } from 'framer-motion';
import { Search, GitBranch, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Search',
    description: 'Start with any topic, person, company, or concept that sparks your curiosity.',
    iconColor: 'text-forest-600',
    accent: 'bg-forest-500/10',
  },
  {
    icon: GitBranch,
    title: 'Explore',
    description: 'Discover unexpected connections and traverse an infinite web of related ideas.',
    iconColor: 'text-plum-500',
    accent: 'bg-plum-400/10',
  },
  {
    icon: Lightbulb,
    title: 'Understand',
    description: 'Build your own knowledge universe and see how everything fits together.',
    iconColor: 'text-amber-accent',
    accent: 'bg-amber-accent/10',
  },
];

export default function FeatureCards() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            How it works
          </h2>
          <p className="text-base sm:text-lg text-navy-700/70 max-w-xl mx-auto">
            Three simple steps to transform how you explore knowledge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="relative h-full bg-white border border-navy-800/10 rounded-card p-8 hover:border-navy-800/20 transition-all duration-300 shadow-soft">
                <div className={`absolute inset-0 rounded-card ${feature.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />

                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl ${feature.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-navy-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-navy-700/70 leading-relaxed">
                    {feature.description}
                  </p>

                  {index < features.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 w-6 h-6 items-center justify-center">
                      <svg
                        className="w-4 h-4 text-navy-700/40"
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
  );
}