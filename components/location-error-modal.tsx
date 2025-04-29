"use client"

import { AlertTriangle, X } from "lucide-react"
import { motion } from "framer-motion"

interface LocationErrorModalProps {
  message: string
  onClose: () => void
}

export default function LocationErrorModal({ message, onClose }: LocationErrorModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-500" size={24} />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Location Access Error</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-slate-700 dark:text-slate-300">{message}</p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">How to fix this:</h4>
          <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <li>Check if location services are enabled on your device</li>
            <li>Allow location access when prompted by your browser</li>
            <li>In your browser settings, ensure this website has permission to access your location</li>
            <li>Try refreshing the page and allowing location access</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-slate-800 dark:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose()
              window.location.reload()
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
