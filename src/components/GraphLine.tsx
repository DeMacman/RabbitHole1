import { motion } from 'framer-motion'

interface GraphLineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  delay?: number
}

export default function GraphLine({ x1, y1, x2, y2, delay = 0 }: GraphLineProps) {
  return (
    <motion.line
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ delay, duration: 1.5, ease: 'easeInOut' }}
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke="rgba(124, 58, 237, 0.2)"
      strokeWidth="1"
    />
  )
}