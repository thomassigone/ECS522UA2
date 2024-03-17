import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const Forecast = ({city}) => {
    //const [city, setCity] = useState('');
    const [forecastData, setForecastData] = useState(null);
  
    const fetchData = useCallback(async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&appid=2d8574f0c9e529f4c795e6b8e3ac25ef`
        );
        setForecastData(response.data.list);
        console.log(response.data); //You can see all the weather data in console log
      } catch (error) {
        console.error(error);
      }
    }, [city]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp*1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    }

    return (
    <div>
        {forecastData ? (
            <>
                <h2>{forecastData[0].name}</h2>
                {forecastData.map((forecast, index) => (
                    <div key={index}>
                        <p>Date: {formatDate(forecast.dt)}</p>
                        <p>Lo temp: {forecast.temp.min}°C</p>
                        <p>Hi temp: {forecast.temp.max}°C</p>
                        <p>Rain chance : {forecast.pop*100}%</p>
                        <p>Max Wind Speed : {forecast.speed}m/s</p>
                    </div>
                ))}
            </>
        ) : (
            <p>Loading weather data...</p>
        )}
    </div>
    );
};

export default Forecast;