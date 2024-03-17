import React, { useEffect, useState, useCallback } from 'react';
import WeatherAPI from "./WeatherAPI";
import Provisions from "./components/Provisions";
import axios from 'axios';


function App() {
  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  const [alertData, setAlertData] = useState({});
  

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
      <WeatherAPI/>
      <Provisions alert={alertData} showMockDataAlert={true}/>
    </div>
      </>
    
  );
}

export default App;
