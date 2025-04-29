"use client"

import { useState, useEffect } from "react"
import { getWeatherIcon } from "@/lib/utils"
import { motion } from "framer-motion"
import { Locate } from "lucide-react"

interface WeatherCardProps {
  weather: any
  units: string
  isLiveTracking?: boolean
}

export default function WeatherCard({ weather, units, isLiveTracking = false }: WeatherCardProps) {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  const WeatherIcon = getWeatherIcon(weather.weather[0].main)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-xl overflow-hidden shadow-lg"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white drop-shadow-md flex items-center gap-2">
              <span>{weather.name}</span>
              <span className="text-sm bg-white/30 dark:bg-slate-700/50 px-2 py-1 rounded-full">
                {weather.sys.country}
              </span>
              {isLiveTracking && (
                <span className="flex items-center gap-1 text-sm bg-green-500/70 px-2 py-1 rounded-full">
                  <Locate size={14} className="animate-pulse" />
                  <span>Live</span>
                </span>
              )}
            </h2>
            <p className="text-white/80 mt-1">{formatDate(dateTime)}</p>
            <p className="text-white/80">{formatTime(dateTime)}</p>
          </div>
          <div className="text-right">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold text-white drop-shadow-lg"
            >
              {Math.round(weather.main.temp)}°{units === "metric" ? "C" : "F"}
            </motion.div>
            <p className="text-white/80 mt-1">
              Feels like: {Math.round(weather.main.feels_like)}°{units === "metric" ? "C" : "F"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center my-6">
          <div className="text-center">
            <div className="flex justify-center">
              <WeatherIcon className="w-24 h-24 text-white drop-shadow-lg" />
            </div>
            <h3 className="text-xl font-semibold text-white mt-2 capitalize">{weather.weather[0].description}</h3>
          </div>
        </div>

        <div className="flex justify-between text-white/90 text-sm">
          <div className="text-center">
            <p className="font-semibold">Min</p>
            <p>
              {Math.round(weather.main.temp_min)}°{units === "metric" ? "C" : "F"}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Max</p>
            <p>
              {Math.round(weather.main.temp_max)}°{units === "metric" ? "C" : "F"}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Wind</p>
            <p>
              {weather.wind.speed} {units === "metric" ? "m/s" : "mph"}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Clouds</p>
            <p>{weather.clouds.all}%</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
