"use client"

import { Thermometer, Wind, Droplets, BarChart2, Sunrise, Sunset } from "lucide-react"
import { motion } from "framer-motion"

interface WeatherDetailsProps {
  weather: any
  units: string
}

export default function WeatherDetails({ weather, units }: WeatherDetailsProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-white mb-4">Weather Details</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div variants={item} className="bg-white/10 dark:bg-slate-700/30 p-4 rounded-lg flex items-center gap-3">
          <Thermometer className="text-red-400" size={24} />
          <div>
            <p className="text-white/70 text-sm">Feels like</p>
            <p className="text-white font-semibold">
              {Math.round(weather.main.feels_like)}°{units === "metric" ? "C" : "F"}
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white/10 dark:bg-slate-700/30 p-4 rounded-lg flex items-center gap-3">
          <Droplets className="text-blue-400" size={24} />
          <div>
            <p className="text-white/70 text-sm">Humidity</p>
            <p className="text-white font-semibold">{weather.main.humidity}%</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white/10 dark:bg-slate-700/30 p-4 rounded-lg flex items-center gap-3">
          <Wind className="text-teal-400" size={24} />
          <div>
            <p className="text-white/70 text-sm">Wind</p>
            <p className="text-white font-semibold">
              {weather.wind.speed} {units === "metric" ? "m/s" : "mph"}
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white/10 dark:bg-slate-700/30 p-4 rounded-lg flex items-center gap-3">
          <BarChart2 className="text-purple-400" size={24} />
          <div>
            <p className="text-white/70 text-sm">Pressure</p>
            <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white/10 dark:bg-slate-700/30 p-4 rounded-lg flex items-center gap-3">
          <Sunrise className="text-yellow-400" size={24} />
          <div>
            <p className="text-white/70 text-sm">Sunrise</p>
            <p className="text-white font-semibold">{formatTime(weather.sys.sunrise)}</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white/10 dark:bg-slate-700/30 p-4 rounded-lg flex items-center gap-3">
          <Sunset className="text-orange-400" size={24} />
          <div>
            <p className="text-white/70 text-sm">Sunset</p>
            <p className="text-white font-semibold">{formatTime(weather.sys.sunset)}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
