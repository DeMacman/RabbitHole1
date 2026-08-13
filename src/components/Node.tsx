import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface NodeProps {
  label: string
  x: number
  y: number
  icon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  delay?: number
}

export default function Node({ label, x, y, icon, size = 'md', delay = 0 }: NodeProps) {
  const sizes = {
    sm: 'w-24 h-12 text-xs',
    md: 'w-32 h-16 text-sm',
    lg: 'w-40 h-20 text-base',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className="group cursor-pointer"
      whileHover={{ scale: 1.1 }}
      role="button"
      tabIndex={0}
      aria-label={`Node: ${label}`}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: delay * 0.7,
        }}
        className={`${sizes[size]} bg-[#0F0F10] border border-[rgba(255,255,255,0.08)] rounded-xl flex items-center justify-center backdrop-blur-sm hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/10 transition-all duration-300 shadow-lg`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span className="font-medium text-white">{label}</span>
      </motion.div>
    </motion.div>
  )
}