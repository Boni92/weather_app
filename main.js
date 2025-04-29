const api = {
  key: "5468dff0a0fcc9319929222c75d39d6a",
  base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector(".seach-box")
searchbox.addEventListener("keypress", setQuery)

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value)
    console.log(searchbox.value)
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json()
    })
    .then(displayResults)
}

function displayResults(weather) {
  console.log(weather)
  const city = document.querySelector(".location .city")
  city.innerText = `${weather.name}, ${weather.sys.country}`

  const now = new Date()
  const date = document.querySelector(".location .date")
  date.innerText = dateBuilder(now)

  const temp = document.querySelector(".current .temp")
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>ºC</span>`

  // let weather_el = document.querySelector('.current .weather');
  // weather_el.innerText = weather.weather[0].main;

  const hilow = document.querySelector(".hi-low")
  hilow.innerText = `${Math.round(weather.main.temp_min)}ºC / ${Math.round(weather.main.temp_max)}ºC`

  const viento = document.querySelector(".current .wind")
  viento.innerText = `${weather.wind.speed} m/s`

  const nubes = document.querySelector(".current .clouds")
  nubes.innerText = `${weather.clouds.all} %`
}

function dateBuilder(d) {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Semptiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"]

  const day = days[d.getDay()]
  const date = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()

  return `${day} ${date} ${month} ${year}`
}
