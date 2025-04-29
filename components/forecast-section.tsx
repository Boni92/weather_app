"use client"

import { getWeatherIcon } from "@/lib/utils"
import { motion } from "framer-motion"

interface ForecastSectionProps {
  forecast: any[]
  units: string
}

export default function ForecastSection({ forecast, units }: ForecastSectionProps) {
  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[date.getDay()]
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
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.weather[0].main)

          return (
            <motion.div
              key={day.dt}
              variants={item}
              className="bg-white/10 dark:bg-slate-700/30 p-4 rounded-lg text-center"
            >
              <p className="text-white font-semibold mb-2">{formatDay(day.dt)}</p>
              <div className="flex justify-center my-2">
                <WeatherIcon className="w-12 h-12 text-white" />
              </div>
              <p className="text-white text-sm capitalize">{day.weather[0].description}</p>
              <div className="flex justify-between mt-2 text-white">
                <span>{Math.round(day.main.temp_min)}°</span>
                <span>{Math.round(day.main.temp_max)}°</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
