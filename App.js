import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  // defino mi constante de los datos
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=6e7849af5ea991b87272b3a72ea28802`
  );
  //saco la fecha
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

  useEffect(() => {
    async function fetchWeather() {
      const resp = await fetch(url);
      const json = await resp.json();
      setWeather(json.results);
    }

    fetchWeather();
  }, [url]);

  //los he guardado en weather
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <div
            onSubmit={() =>
              setUrl(
                `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=6e7849af5ea991b87272b3a72ea28802`
              )
            }
          >
            <input
              label="Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
         </div>
        </div>
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{weather.temp}</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
