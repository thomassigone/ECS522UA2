import React, { useEffect, useState, useCallback } from 'react';
import WeatherAPI from "./WeatherAPI";
import Provisions from "./components/Provisions";
import axios from 'axios';
import Location from './Location';
import WeatherInfo from './WeatherInfo';
import HourlyWeather from './components/HourlyWeather'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [alertData, setAlertData] = useState([]);
  

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
      // axios.get(`https://api.weatherapi.com/v1/forecast.json?key=aec898c8a5b64dc09d0195725241203&q=${city}&aqi=no&alerts=yes`)
      // .then(response => setAlertData(response.data.alerts.alert))
      // .catch(error => console.error(error));
    }, [fetchData]);

  
  return (
    <>
    <div className='container'>
      <Location data={fetchData} city={city} setCity={setCity}></Location>
      <WeatherInfo weatherData={weatherData}></WeatherInfo>
      <HourlyWeather/>
    </div>
    <div className='container'>
      
      {/* <WeatherAPI/> */}
      <Provisions alerts={alertData}/>
    </div>
    <div>
      
    </div>
      
      
      </>
    
  );
}

export default App;
