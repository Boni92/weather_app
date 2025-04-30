
type LanguageCode = "en" | "es";

type TranslationMap = {
  [key: string]: string;
};

type TranslationCategory = {
  [lang in LanguageCode]: TranslationMap;
};

type Translations = {
  [category: string]: TranslationCategory;
};

export const translations: Translations = {
  weatherConditions: {
    en: {
      "Clear": "Clear",
      "Clouds": "Cloudy",
      "Rain": "Rain",
      "Snow": "Snow",
      "Thunderstorm": "Thunderstorm",
      "Drizzle": "Drizzle",
      "Mist": "Mist",
      "Smoke": "Smoke",
      "Haze": "Haze",
      "Dust": "Dust",
      "Fog": "Fog",
      "Sand": "Sand",
      "Ash": "Ash",
      "Squall": "Squall",
      "Tornado": "Tornado"
    },
    es: {
      "Clear": "Despejado",
      "Clouds": "Nublado",
      "Rain": "Lluvia",
      "Snow": "Nieve",
      "Thunderstorm": "Tormenta",
      "Drizzle": "Llovizna",
      "Mist": "Neblina",
      "Smoke": "Humo",
      "Haze": "Bruma",
      "Dust": "Polvo",
      "Fog": "Niebla",
      "Sand": "Arena",
      "Ash": "Ceniza",
      "Squall": "Chubasco",
      "Tornado": "Tornado"
    }
  },
  weatherDetails: {
    en: {
      "Feels like": "Feels like",
      "Humidity": "Humidity",
      "Wind": "Wind",
      "Pressure": "Pressure",
      "Visibility": "Visibility",
      "Sunrise": "Sunrise",
      "Sunset": "Sunset",
      "UV Index": "UV Index",
      "Dew Point": "Dew Point",
      "Cloud Cover": "Cloud Cover",
      "Precipitation": "Precipitation",
      "Wind Gust": "Wind Gust",
      "Wind Direction": "Wind Direction"
    },
    es: {
      "Feels like": "Sensación térmica",
      "Humidity": "Humedad",
      "Wind": "Viento",
      "Pressure": "Presión",
      "Visibility": "Visibilidad",
      "Sunrise": "Amanecer",
      "Sunset": "Atardecer",
      "UV Index": "Índice UV",
      "Dew Point": "Punto de rocío",
      "Cloud Cover": "Cobertura nubosa",
      "Precipitation": "Precipitación",
      "Wind Gust": "Ráfaga de viento",
      "Wind Direction": "Dirección del viento"
    }
  },
  units: {
    en: {
      "km/h": "km/h",
      "m/s": "m/s",
      "hPa": "hPa",
      "km": "km",
      "m": "m",
      "°C": "°C",
      "°F": "°F",
      "%": "%"
    },
    es: {
      "km/h": "km/h",
      "m/s": "m/s",
      "hPa": "hPa",
      "km": "km",
      "m": "m",
      "°C": "°C",
      "°F": "°F",
      "%": "%"
    }
  }
};





// export const translations = {
//   weatherConditions: {
//     en: {
//       "Clear": "Clear",
//       "Clouds": "Cloudy",
//       "Rain": "Rain",
//       "Snow": "Snow",
//       "Thunderstorm": "Thunderstorm",
//       "Drizzle": "Drizzle",
//       "Mist": "Mist",
//       "Smoke": "Smoke",
//       "Haze": "Haze",
//       "Dust": "Dust",
//       "Fog": "Fog",
//       "Sand": "Sand",
//       "Ash": "Ash",
//       "Squall": "Squall",
//       "Tornado": "Tornado"
//     },
//     es: {
//       "Clear": "Despejado",
//       "Clouds": "Nublado",
//       "Rain": "Lluvia",
//       "Snow": "Nieve",
//       "Thunderstorm": "Tormenta",
//       "Drizzle": "Llovizna",
//       "Mist": "Neblina",
//       "Smoke": "Humo",
//       "Haze": "Bruma",
//       "Dust": "Polvo",
//       "Fog": "Niebla",
//       "Sand": "Arena",
//       "Ash": "Ceniza",
//       "Squall": "Chubasco",
//       "Tornado": "Tornado"
//     }
//   },
//   weatherDetails: {
//     en: {
//       "Feels like": "Feels like",
//       "Humidity": "Humidity",
//       "Wind": "Wind",
//       "Pressure": "Pressure",
//       "Visibility": "Visibility",
//       "Sunrise": "Sunrise",
//       "Sunset": "Sunset",
//       "UV Index": "UV Index",
//       "Dew Point": "Dew Point",
//       "Cloud Cover": "Cloud Cover",
//       "Precipitation": "Precipitation",
//       "Wind Gust": "Wind Gust",
//       "Wind Direction": "Wind Direction"
//     },
//     es: {
//       "Feels like": "Sensación térmica",
//       "Humidity": "Humedad",
//       "Wind": "Viento",
//       "Pressure": "Presión",
//       "Visibility": "Visibilidad",
//       "Sunrise": "Amanecer",
//       "Sunset": "Atardecer",
//       "UV Index": "Índice UV",
//       "Dew Point": "Punto de rocío",
//       "Cloud Cover": "Cobertura nubosa",
//       "Precipitation": "Precipitación",
//       "Wind Gust": "Ráfaga de viento",
//       "Wind Direction": "Dirección del viento"
//     }
//   },
//   units: {
//     en: {
//       "km/h": "km/h",
//       "m/s": "m/s",
//       "hPa": "hPa",
//       "km": "km",
//       "m": "m",
//       "°C": "°C",
//       "°F": "°F",
//       "%": "%"
//     },
//     es: {
//       "km/h": "km/h",
//       "m/s": "m/s",
//       "hPa": "hPa",
//       "km": "km",
//       "m": "m",
//       "°C": "°C",
//       "°F": "°F",
//       "%": "%"
//     }
//   }
// } 