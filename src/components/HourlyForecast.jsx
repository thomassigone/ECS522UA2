import '../css/hourlyForecast.css';
import axios from 'axios';
import {useState, useEffect, useCallback} from 'react';
import footsteps from '../assets/footsteps.png';
import info from '../assets/info.png';


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
      };

      //generating customized weather alerts for each section of the box
      const displayInfo = (info, value) => {
        let message = "";
        switch (info) {
          case "temperature":
            message = "The current temperature is ";
            message += value;
            message += " °C. \n";
            message += value < 10 ? "It's quite cold, ensure you wear thermal layers." : value <= 20 ? "Ensure to dress appropriately for the hike." : value <= 30 ? "It's a pleasant temperature for hiking. Enjoy!" : "It's quite hot, stay hydrated and take regular breaks.";
            break;

          case "feelsLike":
            message = "Feels like: the perceived temperature can differ from the actual temperature, affecting your comfort. \n \n";
            message += "The current temperature feels like ";
            message += value;
            message += "°C \n";
            message += value < 10 ? "It feels quite cold, ensure you wear windproof layers." : value <= 20 ? "Ensure to dress appropriately for the hike." : value <= 30 ? "It's a pleasant temperature for hiking. Enjoy!" : "It's quite hot, remember to wear a hat and light clothing.";
            break;

          case "humidity":
            message = "Humidity: high humidity can make the temperature feel hotter and make physical activity more strenuous. \n \n"
            message += "The current humidity is ";
            message += value;
            message += " %. \n";
            message += value > 70 ? "Expect a damp environment and Remember to stay hydrated. Trails may be slippery. " : "Humidity conditions are currently good for hiking.";
            break;

          case "visibility":
            message = "Visibility: low visibility can affect your ability to see the path and your surroundings. \n \n"
            message += "The current visibility is ";
            message += value;
            message += " km. \n";
            message += value < 10 ? "Very low visibility. Be cautious and stay on marked trails." : "Good visibility. Enjoy the views!";
            break;
          
          case "windGust":
            message = "Wind Gust: strong wind gusts can make hiking more challenging and make you feel colder. \n \n";
            message += "The current wind gust is ";
            message += value;
            message += " km/h. \n";
            message += value > 40 ? "Expect strong winds. Secure loose items and wear a windbreaker." : "Winds are mild. Enjoy your hike!";
            break;
          
          default:
            message += "Remember to check the weather before your hike!";
            break;
        }

        alert(message);
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
                        <div className='time'>
                          {/* Time */}
                          <p>{getTime(hour)}</p>
                        </div>
                        <div className='description'>
                          {/* Description */}
                          {hourlyData ? (
                            <p>{hourlyData[hour].weather[0].description}</p>)
                            : (<p>Loading data</p>)
                          }
                        </div>
                        <img className='imgfootsteps' src={footsteps} alt="footsteps"></img>
                    </div>
                    
                      {hourlyData ? (
                        <div className='right-box'>
                          {/* Data numbers */}
                          <img className='imginfo' src={info} alt="info" onClick={() => displayInfo("temperature", hourlyData[hour].main.temp)}></img><p className='datalabel'>Temperature: <div className='dataNumbers'>{hourlyData[hour].main.temp} °C</div></p>
                          <img className='imginfo' src={info} alt="info" onClick={() => displayInfo("feelsLike", hourlyData[hour].main.feels_like)}></img><p className='datalabel'>Feels like: <div className='dataNumbers'>{hourlyData[hour].main.feels_like} °C</div></p>
                          <img className='imginfo' src={info} alt="info" onClick={() => displayInfo("humidity", hourlyData[hour].main.humidity)}></img><p className='datalabel'>Humidity: <div className='dataNumbers'>{hourlyData[hour].main.humidity} %</div></p>
                          <img className='imginfo' src={info} alt="info" onClick={() => displayInfo("visibility", hourlyData[hour].visibility / 1000)}></img><p className='datalabel'>Visibility: <div className='dataNumbers'>{hourlyData[hour].visibility / 1000} km</div></p>
                          <img className='imginfo' src={info} alt="info" onClick={() => displayInfo("windGust", hourlyData[hour].wind.gust)}></img><p className='datalabel'>Wind gust: <div className='dataNumbers'>{hourlyData[hour].wind.gust} km/h</div></p>
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