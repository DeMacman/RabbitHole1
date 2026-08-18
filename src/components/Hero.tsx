import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

function PortalVisual() {
  return (
    <div className="relative mx-auto mt-14 max-w-4xl px-2">
      <svg
        viewBox="0 0 1200 420"
        fill="none"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Arch layers */}
        <path
          d="M150 390 C150 180 1050 180 1050 390"
          stroke="rgba(46,84,62,0.22)"
          strokeWidth="1.5"
        />
        <path
          d="M250 390 C250 230 950 230 950 390"
          stroke="rgba(46,84,62,0.16)"
          strokeWidth="1.5"
        />
        <path
          d="M350 390 C350 280 850 280 850 390"
          stroke="rgba(46,84,62,0.10)"
          strokeWidth="1.5"
        />

        {/* Winding path */}
        <path
          d="M90 400 C380 400 480 300 610 260 C740 220 830 250 1080 390"
          stroke="rgba(196,122,79,0.38)"
          strokeWidth="2"
          strokeDasharray="7 7"
        />

        {/* Portal center */}
        <circle cx="600" cy="165" r="5" fill="#3e6a4f" />
        <circle cx="600" cy="165" r="22" stroke="rgba(62,106,79,0.18)" strokeWidth="1" />
        <circle cx="600" cy="165" r="38" stroke="rgba(62,106,79,0.10)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-24 pb-14">
      <div className="text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-500/10 border border-forest-500/25">
            <div className="w-8 h-8 rounded-full bg-forest-600 animate-pulse-soft" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-navy-900 leading-[1.08] mb-6 text-balance"
        >
          Curiosity leads to connections.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-navy-700/80 mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
        >
          RabbitHole lets you explore people, ideas, companies, technologies
          and events through the hidden threads that connect them.
        </motion.p>

        <SearchBar />
      </div>

      <PortalVisual />
    </section>
  );
}