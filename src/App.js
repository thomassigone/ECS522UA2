import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Weather from './Weather';
import WeatherAPI from './WeatherAPI';



function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  
  
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
    }, [fetchData]);


  
  return (
    <>
    <div className='container'>
      
    </div>
      
      
      </>
    
  );
}

export default App;
