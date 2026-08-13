import { motion } from 'framer-motion'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-[#7C3AED] animate-pulse-soft" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 text-balance"
        >
          Explore knowledge,
          <br />
          <span className="bg-gradient-to-r from-[#7C3AED] to-purple-400 bg-clip-text text-transparent">
            not search results
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-[#A1A1AA] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Every idea is connected. Discover unexpected paths between people,
          companies, technologies, history, science, and more.
        </motion.p>

        <SearchBar />
      </div>
    </section>
  )
}

export default Hero