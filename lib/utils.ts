import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from "lucide-react"

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
        backgroundImage: "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #0c1445 0%, #1e3a8a 100%)",
      },
    },
    Clouds: {
      day: {
        backgroundImage: "linear-gradient(to bottom, #8e9eab 0%, #eef2f3 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #2c3e50 0%, #4c5c68 100%)",
      },
    },
    Rain: {
      day: {
        backgroundImage: "linear-gradient(to bottom, #616161 0%, #9bc5c3 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #1f1c2c 0%, #4c5c68 100%)",
      },
    },
    Drizzle: {
      day: {
        backgroundImage: "linear-gradient(to bottom, #89f7fe 0%, #66a6ff 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #141e30 0%, #243b55 100%)",
      },
    },
    Thunderstorm: {
      day: {
        backgroundImage: "linear-gradient(to bottom, #373b44 0%, #4286f4 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #0f0c29 0%, #302b63 100%)",
      },
    },
    Snow: {
      day: {
        backgroundImage: "linear-gradient(to bottom, #e6e9f0 0%, #eef1f5 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #8e9eab 0%, #eef2f3 100%)",
      },
    },
    Mist: {
      day: {
        backgroundImage: "linear-gradient(to bottom, #d7d2cc 0%, #304352 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #232526 0%, #414345 100%)",
      },
    },
    Fog: {
      day: {
        backgroundImage: "linear-gradient(to bottom, #d7d2cc 0%, #304352 100%)",
      },
      night: {
        backgroundImage: "linear-gradient(to bottom, #232526 0%, #414345 100%)",
      },
    },
  }

  return backgrounds[weatherMain]?.[timeOfDay] || backgrounds["Clear"][timeOfDay]
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
