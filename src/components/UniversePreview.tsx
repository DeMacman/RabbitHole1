import { motion } from 'framer-motion'
import Node from './Node'

const nodes = [
  { label: 'OpenAI', x: 20, y: 30, size: 'lg' as const, delay: 0.2 },
  { label: 'Tesla', x: 80, y: 25, size: 'lg' as const, delay: 0.3 },
  { label: 'Physics', x: 15, y: 65, size: 'md' as const, delay: 0.4 },
  { label: 'History', x: 50, y: 70, size: 'md' as const, delay: 0.5 },
  { label: 'NASA', x: 85, y: 60, size: 'md' as const, delay: 0.6 },
  { label: 'Linux', x: 35, y: 20, size: 'sm' as const, delay: 0.7 },
  { label: 'Python', x: 65, y: 15, size: 'sm' as const, delay: 0.8 },
  { label: 'Quantum Computing', x: 50, y: 45, size: 'sm' as const, delay: 0.9 },
]

const connections = [
  { x1: 20, y1: 30, x2: 80, y2: 25 },
  { x1: 20, y1: 30, x2: 15, y2: 65 },
  { x1: 80, y1: 25, x2: 85, y2: 60 },
  { x1: 15, y1: 65, x2: 50, y2: 70 },
  { x1: 50, y1: 70, x2: 85, y2: 60 },
  { x1: 35, y1: 20, x2: 65, y2: 15 },
  { x1: 50, y1: 45, x2: 35, y2: 20 },
  { x1: 50, y1: 45, x2: 65, y2: 15 },
]

export default function UniversePreview() {
  return (
    <section className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            See the connections
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Watch how ideas connect and form an ever-expanding knowledge universe.
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            {connections.map((conn, index) => (
              <line
                key={index}
                x1={`${conn.x1}%`}
                y1={`${conn.y1}%`}
                x2={`${conn.x2}%`}
                y2={`${conn.y2}%`}
                stroke="rgba(124, 58, 237, 0.15)"
                strokeWidth="1"
                className="animate-pulse-soft"
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </svg>

          {nodes.map((node) => (
            <Node
              key={node.label}
              label={node.label}
              x={node.x}
              y={node.y}
              size={node.size}
              delay={node.delay}
            />
          ))}

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#7C3AED] rounded-full pointer-events-none"
            style={{
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.5), 0 0 60px rgba(124, 58, 237, 0.3)',
            }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </section>
  )
}