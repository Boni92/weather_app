import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from "lucide-react"
import { translations } from "./translations"

export function getWeatherIcon(weatherMain: string) {
  const iconMap: Record<string, any> = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Drizzle: CloudDrizzle,
    Thunderstorm: CloudLightning,
    Snow: CloudSnow,
    Mist: CloudFog,
    Fog: CloudFog,
    Haze: CloudFog,
    Dust: Wind,
    Smoke: CloudFog,
    Tornado: Wind,
  }

  return iconMap[weatherMain] || Cloud
}

export function getWeatherBackground(weatherMain: string) {
  const timeOfDay = new Date().getHours() > 6 && new Date().getHours() < 18 ? "day" : "night"

  const backgrounds: Record<string, Record<string, any>> = {
    Clear: {
      day: {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    Clouds: {
      day: {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    Rain: {
      day: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    Drizzle: {
      day: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    Thunderstorm: {
      day: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    Snow: {
      day: {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    Mist: {
      day: {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    Fog: {
      day: {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      night: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/sunny2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
  }

  return backgrounds[weatherMain]?.[timeOfDay] || backgrounds["Clear"][timeOfDay]
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export const translate = (key: string, language: "ES" | "EN", category: keyof typeof translations) => {
  const lang = language.toLowerCase() as "es" | "es"
  return translations[category][lang][key] || key
}
