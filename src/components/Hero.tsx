import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-16">
      <div className="text-center max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 backdrop-blur-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#7C3AED] animate-pulse-soft" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-[1.15] sm:leading-[1.1] mb-6 sm:mb-8 text-balance"
        >
          Explore knowledge,
          <br />
          <span className="bg-gradient-to-r from-[#7C3AED] to-purple-400 bg-clip-text text-transparent">
            not search results
          </span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-[#A1A1AA] mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
        >
          Every idea is connected, Discover unexpected paths between people,
          companies, technologies, history, science, and more...
        </motion.p>

        {/* Search bar */}
        <SearchBar />
      </div>
    </section>
  );
}