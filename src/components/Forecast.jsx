import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../css/forecast.css';

//7-day forecast component
const Forecast = ({city}) => {
    const [forecastData, setForecastData] = useState(null);
  
    //fetch forecast data from API
    const fetchData = useCallback(async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&appid=2d8574f0c9e529f4c795e6b8e3ac25ef`
        );
        setForecastData(response.data.list);
        console.log("Forecast: ", response.data); //You can see all the weather data in console log
      } catch (error) {
        console.error(error);
      }
    }, [city]);

    //when city input changes the effect will run, and fetch new data from the API
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    //function to convert timetstamp returned from API call into weekday abbreviations
    //used for the first column in the 7-day forecast box
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
            <p>Loading 7-day forecast...</p>
        )}
    </div>
    </>   

    );
};

export default Forecast;