import React, { useState } from "react";
import axios from "axios";


export default function Weather() {
    const [city, setCity] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [weather, setWeather] = useState({});
  
    function displayWeather(response) {
      setLoaded(true);
  
      setWeather({
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        description: response.data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
  
      let apiKey = "094780c710fa4efd669f0df8c3991927";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayWeather);
    }
  
    function showCity(event) {
      setCity(event.target.value);
    }
  
    let form = (
      <form className="App">
        <input type="Search" placeholder="Search city.." onChange={showCity} />
        <button type="Submit" onClick={handleSubmit}>
          Search{" "}
        </button>
      </form>
    );
  
    if (loaded) {
      return (
        <div>
          {form}
          <ul>
            <li>Temperature: {Math.round(weather.temperature)}°C</li>
            <li>Humidity: {weather.humidity}%</li>
            <li>Wind: {weather.wind}km/hr</li>
            <li>Description: {weather.description}</li>
            <img src={weather.icon} alt={weather.description} />
          </ul>
        </div>
      );
    } else {
      return form;
    }
  }