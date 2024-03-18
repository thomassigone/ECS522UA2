import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../css/forecast.css';

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
        const weekDayIndex = date.getDay();
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weekDayString = weekDays[weekDayIndex];
        return weekDayString;
    }

    return (
    <>
        <div className="forecast-box">
        {forecastData ? (
            <>
                <ul className="forecast-headings">
                        <li>Day</li>
                        <li>Lo (°C)</li>
                        <li>Hi (°C)</li>
                        <li>Rain chance</li>
                        <li>Wind (m/s)</li>
                </ul>
                <hr />
                <div className="forecast-grid">
                    {forecastData.map((forecast, index) => (
                        <>
                            <ul key={index} className="forecast-row">
                                <li className="forecast-text">{index == 0 ? 'Today' : formatDate(forecast.dt)}</li>
                                <li className="forecast-text">{forecast.temp.min}</li>
                                <li className="forecast-text">{forecast.temp.max}</li>
                                <li className="forecast-text">{forecast.pop*100}%</li>
                                <li className="forecast-text">{forecast.speed}</li>
                            </ul>
                            {index != forecastData.length-1 && <hr />}
                        </>
                    ))}
                </div>
            </>
        ) : (
            <p>Loading weather data...</p>
        )}
    </div>
    </>   

    );
};

export default Forecast;