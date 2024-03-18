import '../css/hourlyForecast.css';
import axios from 'axios';
import {useState, useEffect, useCallback} from 'react';



function HourlyForecast({city}){
    //to set and change the hour user user
    const [hour, setHour] = useState(0);
    //to fetch data for the hour chosen by the user
    const [hourlyData, setHourlyData] = useState();
    
    
    //fetch hourly data from API
    const fetchData = useCallback(async () => {
        try {
          const response = await axios.get(
            `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=2d8574f0c9e529f4c795e6b8e3ac25ef`
          );
          setHourlyData(response.data.list);
          console.log(response.data); //You can see all the weather data in console log
        } catch (error) {
          console.error(error);
        }
      }, [city]);
  
      useEffect(() => {
          fetchData();
      }, [fetchData]);

      //to store data from the slider
      const handleHourChange = (event) => {
        setHour(event.target.value);
      };

      //formatting time
      const getTime = (index) => {
        index = parseInt(index)
        const date = new Date()
        const hours = parseInt(date.getHours());
        const hourOption = index + hours + 1
        if(hourOption < 24){
            return (hourOption + ":00")
        }
        else{
            return ((hourOption - 24) + ":00")
        }
      } 

      return(
        <>
            <div className='hourly-forecast'>
                <div className='hours'>
                        <p>{getTime(0)}</p>
                        <p>{getTime(1)}</p>
                        <p>{getTime(2)}</p>
                        <p>{getTime(3)}</p>
                        <p>{getTime(4)}</p>
                        <p>{getTime(5)}</p>
                </div>
                <div className='hourly-slider'>
                    
                    <input className='slider'
                        type="range"
                        min={0}
                        max={5}
                        value={hour}
                        onChange={handleHourChange}
                    />
        
                </div>
                <div className='hourly-weather-box'> 
                    <div className='left-box'>
                        <p>Time : {getTime(hour)}</p>
                        {hourlyData ? (
                          <p>Description: {hourlyData[hour].weather[0].description}</p>)
                          : (<p>Loading data</p>)
                        }
                        
                    </div>
                    
                      {hourlyData ? (
                        <div className='right-box'>
                          <p>Temperature: {hourlyData[hour].main.temp} °C</p>
                          <p>Feels like: {hourlyData[hour].main.feels_like} °C</p>
                          <p>Humidity: {hourlyData[hour].main.humidity}</p>
                          <p>Visibility: {hourlyData[hour].visibility / 1000} km</p>
                          <p>Wind gust: {hourlyData[hour].wind.gust} km/h</p>
                        </div>
                      ):(
                          <p>Loading Data</p>
                        
                      )}
    
                        
                        
                    
                    
                    

                </div>
                
            </div>

            
        </>
      );
}

export default HourlyForecast;