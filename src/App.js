import React, { useEffect, useState, useCallback } from 'react';
import WeatherAPI from "./WeatherAPI";
import Provisions from "./components/Provisions";
import Forecast from "./components/Forecast";
import axios from 'axios';


function App() {
  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  const [alertData, setAlertData] = useState([]);
  
  const changeCity = (newCity) => {
    setCity(newCity);
  };

  const fetchData = useCallback(async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2d8574f0c9e529f4c795e6b8e3ac25ef`
        );
        setWeatherData(response.data);
        console.log(response.data); //You can see all the weather data in console log
      } catch (error) {
        console.error(error);
      }
    }, [city]);
    useEffect(() => {
      fetchData();
      axios.get(`https://api.weatherapi.com/v1/forecast.json?key=aec898c8a5b64dc09d0195725241203&q=${city}&aqi=no&alerts=yes`)
      .then(response => setAlertData(response.data.alerts.alert))
      .catch(error => console.error(error));
    }, [fetchData]);

  
  return (
    <>
    <div className='container'>
      <WeatherAPI onCityChange={changeCity}/>
      <Provisions alerts={alertData}/>
      <Forecast city={city}/>
    </div>
    </>
    
  );
}

export default App;
