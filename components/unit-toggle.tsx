"use client"

import { motion } from "framer-motion"

interface UnitToggleProps {
  units: string
  onToggle: () => void
}

export default function UnitToggle({ units, onToggle }: UnitToggleProps) {
  return (
    <div className="flex items-center bg-white/10 dark:bg-slate-700/30 rounded-full p-1">
      <button onClick={onToggle} className="relative flex items-center" aria-label="Toggle temperature units">
        <div className="flex">
          <span
            className={`px-3 py-1 rounded-full transition-colors ${
              units === "metric" ? "text-slate-800 font-medium" : "text-white"
            }`}
          >
            °C
          </span>
          <span
            className={`px-3 py-1 rounded-full transition-colors ${
              units === "imperial" ? "text-slate-800 font-medium" : "text-white"
            }`}
          >
            °F
          </span>
        </div>
        <motion.div
          className="absolute inset-0 bg-white dark:bg-blue-400 rounded-full z-[-1]"
          initial={false}
          animate={{
            x: units === "metric" ? 0 : "100%",
            width: "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </button>
    </div>
  )
}
