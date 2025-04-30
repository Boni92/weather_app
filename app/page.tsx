"use client"

import { useState, useEffect, useRef } from "react"
import { Sun, Moon, MapPin, RefreshCw, Locate, AlertTriangle } from "lucide-react"
import WeatherCard from "@/components/weather-card"
import ForecastSection from "@/components/forecast-section"
import WeatherDetails from "@/components/weather-details"
import UnitToggle from "@/components/unit-toggle"
import SearchBar from "@/components/search-bar"
import { getWeatherBackground } from "@/lib/utils"
import { useTheme } from "next-themes"
import LocationErrorModal from "@/components/location-error-modal"

export default function Home() {
  const [weather, setWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [units, setUnits] = useState("metric") // metric or imperial
  const [city, setCity] = useState("")
  const [isLiveTracking, setIsLiveTracking] = useState(false)
  const [locationErrorDetails, setLocationErrorDetails] = useState<{
    show: boolean
    code?: number
    message: string
  }>({
    show: false,
    message: "",
  })
  const [language, setLanguage] = useState<"ES" | "EN">("ES")
  const liveTrackingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { theme, setTheme } = useTheme()

  const apiKey = "5468dff0a0fcc9319929222c75d39d6a"

  const toggleUnits = () => {
    const newUnits = units === "metric" ? "imperial" : "metric"
    setUnits(newUnits)
    if (city) {
      // Usamos el nuevo valor de unidades directamente en lugar de esperar a que se actualice el estado
      fetchWeatherWithUnits(city, newUnits)
    }
  }

  const fetchWeatherWithUnits = async (query: string, unitSystem: string) => {
    if (!query) return

    setLoading(true)
    setError("")

    try {
      // Fetch current weather with specified units
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unitSystem}&appid=${apiKey}`,
      )

      if (!weatherRes.ok) {
        throw new Error("City not found")
      }

      const weatherData = await weatherRes.json()
      setWeather(weatherData)

      // Fetch 5-day forecast with specified units
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=${unitSystem}&appid=${apiKey}`,
      )

      if (!forecastRes.ok) {
        throw new Error("Could not get forecast")
      }

      const forecastData = await forecastRes.json()

      // Process forecast data to get one forecast per day
      const dailyForecasts = forecastData.list.filter((forecast: any, index: number) => index % 8 === 0).slice(0, 5)
      setForecast(dailyForecasts)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeather = async (query: string) => {
    fetchWeatherWithUnits(query, units)
  }

  const fetchWeatherByCoordinates = async (latitude: number, longitude: number) => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`,
      )

      if (!res.ok) {
        throw new Error("Could not get weather for your location")
      }

      const data = await res.json()
      setCity(data.name)
      fetchWeather(data.name)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleGeolocationError = (error: GeolocationPositionError) => {
    // Desactivar el seguimiento en tiempo real si estaba activo
    if (isLiveTracking) {
      if (liveTrackingIntervalRef.current) {
        clearInterval(liveTrackingIntervalRef.current)
        liveTrackingIntervalRef.current = null
      }
      setIsLiveTracking(false)
    }

    let errorMessage = "Could not access your location"

    // Proporcionar mensajes de error más específicos basados en el código de error
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "Location access was denied. Please enable location permissions in your browser settings."
        break
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable. Please check your device's location services."
        break
      case error.TIMEOUT:
        errorMessage = "The request to get your location timed out. Please try again."
        break
      default:
        errorMessage = `An unknown error occurred: ${error.message}`
    }

    setLocationErrorDetails({
      show: true,
      code: error.code,
      message: errorMessage,
    })

    setLoading(false)
  }

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherByCoordinates(latitude, longitude)
        },
        handleGeolocationError,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    } else {
      setLocationErrorDetails({
        show: true,
        message:
          "Geolocation is not supported in your browser. Please try a different browser or manually search for a city.",
      })
    }
  }

  const toggleLiveTracking = () => {
    if (isLiveTracking) {
      // Desactivar el seguimiento en tiempo real
      if (liveTrackingIntervalRef.current) {
        clearInterval(liveTrackingIntervalRef.current)
        liveTrackingIntervalRef.current = null
      }
      setIsLiveTracking(false)
    } else {
      // Activar el seguimiento en tiempo real
      getLocationWeather() // Obtener la ubicación inmediatamente

      // Configurar un intervalo para actualizar cada 5 minutos (300000 ms)
      liveTrackingIntervalRef.current = setInterval(() => {
        getLocationWeather()
      }, 300000)

      setIsLiveTracking(true)
    }
  }

  useEffect(() => {
    // Auto-detect theme based on time of day
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 18
    setTheme(isDayTime ? "light" : "dark")

    // Get weather for user's location on initial load
    getLocationWeather()

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (liveTrackingIntervalRef.current) {
        clearInterval(liveTrackingIntervalRef.current)
      }
    }
  }, [])

  const handleSearch = (query: string) => {
    // Si hay seguimiento en tiempo real activo, desactivarlo cuando se busca una ciudad
    if (isLiveTracking) {
      toggleLiveTracking()
    }

    setCity(query)
    fetchWeather(query)
  }

  const closeLocationErrorModal = () => {
    setLocationErrorDetails({ show: false, message: "" })
  }

  const backgroundStyle = weather ? getWeatherBackground(weather.weather[0].main) : {}

  return (
    <main className="min-h-screen w-full transition-all duration-500" style={backgroundStyle}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Weather App</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage(language === "ES" ? "EN" : "ES")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
              aria-label="Toggle language"
            >
              <span className="text-white font-medium">{language}</span>
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6 text-yellow-300" />
              ) : (
                <Moon className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <SearchBar onSearch={handleSearch} />
            <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
              <div className="flex gap-2">
                <button
                  onClick={getLocationWeather}
                  className="flex items-center gap-2 text-white bg-blue-500/80 hover:bg-blue-600/80 px-4 py-2 rounded-lg transition-all"
                >
                  <MapPin size={18} />
                  <span>My location</span>
                </button>

                <button
                  onClick={toggleLiveTracking}
                  className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-all ${
                    isLiveTracking ? "bg-green-500/80 hover:bg-green-600/80" : "bg-blue-500/80 hover:bg-blue-600/80"
                  }`}
                  aria-label={isLiveTracking ? "Disable live tracking" : "Enable live tracking"}
                >
                  <Locate size={18} className={isLiveTracking ? "animate-pulse" : ""} />
                  <span>{isLiveTracking ? "Live tracking ON" : "Live tracking"}</span>
                </button>
              </div>

              <UnitToggle units={units} onToggle={toggleUnits} />
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center p-12">
              <RefreshCw className="animate-spin text-white" size={48} />
            </div>
          )}

          {error && (
            <div className="bg-red-500/80 text-white p-4 rounded-xl text-center flex items-center justify-center gap-2">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          {weather && !loading && (
            <>
              <WeatherCard 
                weather={weather} 
                units={units} 
                isLiveTracking={isLiveTracking}
                language={language}
              />

              <WeatherDetails 
                weather={weather} 
                units={units}
                language={language}
              />

              {forecast && <ForecastSection forecast={forecast} units={units} />}
            </>
          )}
        </div>
      </div>

      {locationErrorDetails.show && (
        <LocationErrorModal message={locationErrorDetails.message} onClose={closeLocationErrorModal} />
      )}
    </main>
  )
}
