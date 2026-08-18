import { motion } from 'framer-motion';

const rabbitHoles = [
  {
    path: ['NVIDIA', 'AI', 'Jensen Huang'],
    color: 'bg-forest-500/10 text-forest-700',
  },
  {
    path: ['Christopher Nolan', 'Film', 'Manhattan Project'],
    color: 'bg-plum-400/10 text-plum-600',
  },
  {
    path: ['Apple', 'Xerox', 'GUI'],
    color: 'bg-amber-accent/10 text-amber-accent',
  },
  {
    path: ['Elon Musk', 'SpaceX', 'NASA'],
    color: 'bg-teal-accent/10 text-teal-accent',
  },
];

export default function UniversePreview() {
  return (
    <section className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
            Popular Rabbit Holes
          </h2>
          <p className="text-base sm:text-lg text-navy-700/70 max-w-xl mx-auto">
            Start with an idea and follow the connections wherever they lead.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {rabbitHoles.map((hole, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-navy-800/10 rounded-card p-6 shadow-soft hover:shadow-lift transition-shadow duration-300"
            >
              <div className="flex flex-wrap items-center gap-2">
                {hole.path.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    {i > 0 && (
                      <span className="text-navy-700/40 text-sm">→</span>
                    )}
                    <span className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${hole.color}`}>
                      {step}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}