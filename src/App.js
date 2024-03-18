import React, { useEffect, useState, useCallback } from 'react';
import Provisions from "./components/Provisions";
import Forecast from "./components/Forecast";
import WeatherInfo from './components/WeatherInfo';
import axios from 'axios';
import Location from './Location';
import HourlyWeather from './components/HourlyWeather';

function App() {
  //used to store the city/location entered by the user
  const [city, setCity] = useState('');

  //used to store the weatherData from the API
  const [weatherData, setWeatherData] = useState(null);
  const [alertData, setAlertData] = useState({});
  
    //fecthing data from API based on user input every time a new city is entered
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
      .then(response => {
        if(response.data.alerts.alert.length !== 0) {
          setAlertData(response.data.alerts.alert[0])
        };
      })
      .catch(error => console.error(error));
    }, [fetchData]);

  
  return (
    <>
    <div className='container'>
      <Location data={fetchData} city={city} setCity={setCity}></Location>
      <WeatherInfo weatherData={weatherData}></WeatherInfo>
      <HourlyWeather/>
      <Provisions alerts={alertData}/>
      <Forecast city={city}/>
    </div>
    </>
    
  );
}

export default App;
