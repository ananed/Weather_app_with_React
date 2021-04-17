import './App.css';
import React, {useState} from 'react';



function App() {

  const [weather, setWeather] = useState();
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  
    const search = evt => {
      const city = evt.target.value;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6e7849af5ea991b87272b3a72ea28802`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            console.log(result);
          });
    }
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onKeyPress={search}
          />
        </div>
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;



