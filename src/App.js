import React, { useState } from 'react';
const api = {
  key: "92268d66102797a32512d719c52b0b0d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function classChanger(param) {
  return param[2]+param[0]+param[1];
}

function weatherNameChanger(param) {
  switch(param) {
    case 'Clear' :
      return "So, it's Sunny.";
    case 'Clouds' : 
      return "So, it' Cloudy.";
    case 'Haze':
      return "So, it's Foggy ."; 
    default : 
      return '';
  }

}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.weather[0].icon[2] === 'n') ? 'app day' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className = {
              (typeof weather.main != "undefined") ? ((weather.weather[0].icon[2] === 'n') ? 'search-bar-night' : 'search-bar-day') : 'search-bar-day'
            }
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="weather-box">
            <div className={classChanger(weather.weather[0].icon)}></div>
            <div className="temp">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="weather">{weatherNameChanger(weather.weather[0].main)}</div>
          </div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
