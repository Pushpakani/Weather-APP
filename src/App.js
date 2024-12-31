import React, { useState } from 'react';
import './App.css';
import sunnyImage from './images/Sunny.png';
import rainyImage from './images/Rainy.png';
import cloudImage from './images/Clouds.png';
import snowImage from './images/snow.png';



const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');


  const apiKey = 'ae03b3316f05ce29c1bc5f0a697f6034'

  // Function to fetch weather data
  const getWeather = () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      return;
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found. Please check the spelling or try another city.');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        changeBackground(data.weather[0].main);
        setError('');
      })
      .catch((err) => {
        setError(err.message);
        setWeatherData(null);
      });
  };

  const changeBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        setBackgroundImage(sunnyImage);
        break;
      case 'Rain':
        setBackgroundImage(rainyImage);
        break;
      case 'Clouds':
        setBackgroundImage(cloudImage);
        break;
      case 'Snow':
        setBackgroundImage(snowImage);
        break;
      default:
        setBackgroundImage(sunnyImage); 
    }
  };

  return (
    <div
    className="app-container"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center',height: '110vh',width:'100%' }}  >
    
    <div className="App" >
      
      <h1 >Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
