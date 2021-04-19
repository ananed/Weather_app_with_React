import "./App.css";
import React, { useState } from "react";

const dateBuilder = (d) => {
  let months = [
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
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function App() {
  // defino mi constante de los datos
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=6e7849af5ea991b87272b3a72ea28802`;

  //saco la fecha
  async function fetchWeather() {
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  }

  //los he guardado en weather
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <div>
            <input
              className="busca"
              label="name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="botton" onClick={() => fetchWeather(url)}>Search</button>
          </div>
        </div>
        {weather && (
          <div className="container">
            <div className="location-box">
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">{weather.main.temp} ºC</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
