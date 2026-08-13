import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer
      id="about"
      className="relative border-t border-white/10 bg-[#050505] px-6 py-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-2 flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#7C3AED]/30 bg-[#7C3AED]/20">
              <div className="h-4 w-4 rounded-full bg-[#7C3AED]" />
            </div>

            <span className="font-display text-lg font-semibold text-white">
              RabbitHole
            </span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#A1A1AA]">
            Explore knowledge through beautifully connected ideas. Discover
            relationships instead of isolated search results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-col items-center gap-4 md:items-end"
        >
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#A1A1AA] transition-colors hover:text-white"
            >
              GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p className="text-sm text-[#71717A]">
            © {new Date().getFullYear()} RabbitHole. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer