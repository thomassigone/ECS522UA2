import React, { useEffect, useState, useCallback } from 'react';
import WeatherAPI from "./WeatherAPI";
import axios from 'axios';
import Location from './Location';
import WeatherInfo from './Components/WeatherInfo';


function App() {
  //used to store the city/location entered by the user
  const [city, setCity] = useState('');

  //used to store the weatherData from the API
  const [weatherData, setWeatherData] = useState(null);
  
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
    }, [fetchData]);


  
  return (
    <>
    <div className='container'>
      <Location data={fetchData} city={city} setCity={setCity}></Location>
      <WeatherInfo weatherData={weatherData}></WeatherInfo>
    </div>
    </>
    
  );
}

export default App;
