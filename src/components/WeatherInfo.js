import React, { useEffect, useState} from 'react';

import loadingImg from '../assets/loading-gif.gif';
import cloudImg from '../assets/cloudimg.png';
import visibilitImg from '../assets/visibility.png';
import wingImg from '../assets/outline.png';
import sunriseImg from '../assets/sunrise.png';
import sunsetImg from '../assets/Vector.png';
import sunnyImg from '../assets/sunny.png';
import snowImg from '../assets/snow.png';
import stormImg from '../assets/storm.png';
import moonImg from '../assets/moon.png';
import rainImg from '../assets/rain.png';

function WeatherInfo(props){
    //useEffect to display the current weather
    const [Image, setImage] = useState(loadingImg);

    useEffect(() => {
      // This effect will run whenever the 'weatherData.weather[0].description' prop changes
      if (props.weatherData && props.weatherData.weather && props.weatherData.weather.length > 0) {
        const description = props.weatherData.weather[0].description;
        // Update the image state based on the description
        if (description.includes('sunny')){
          setImage(sunnyImg);
        }else if (description.includes('snow')){
          setImage(snowImg);
        }else if (description.includes('storm')){
          setImage(stormImg);
        }else if (description.includes('clear')) {
          const currentTime = new Date()
          //check the current time so sun/moon can be displayed accordingly
          if (currentTime > timeConverter(props.weatherData.sys.sunrise) && currentTime < timeConverter(props.weatherData.sys.sunset)){
            setImage(sunnyImg);
          }
          else{
            setImage(moonImg);
          }
          
        } else if (description.includes('cloud')) {
          setImage(cloudImg);
        } else if (description.includes('rain')) {
          setImage(rainImg);
        } else {
          // Default image if description doesn't match any condition
          setImage(loadingImg);
        }
      }
    }, [props.weatherData]);
    

    //function to convert unixTimeStamp to hours and minutes
    //mainly used to converst some values from the API
    const timeConverter = (unixTimeStamp) => {
      const date = new Date(unixTimeStamp * 1000)
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return (hours + ':' + minutes);
    }

    //get visibility in kms
    const getVisibility = () => {
      return ((props.weatherData.visibility) / 1000);
      
    }
    

    return(
        <>
         <div className="weather-box">
                  <img src={Image} alt="Weather-icon" className='weather-icon'/>
                  {props.weatherData ? (
                  <>
                    
                    <p className='temperature-text'>{props.weatherData.main.temp}°C</p>
                    <p className='weather-description-text'>{props.weatherData.weather[0].description}</p>

                    
                    <div className="weather-grid-container">
                      <div className="weather-grid-item">
                        <img src= {wingImg} className='small-icon'></img>
                        Wind Speed : {props.weatherData.wind.speed} km/h
                      </div>
                      <div className="weather-grid-item">
                        <img src= {sunriseImg} className='small-icon'></img>
                        Sunrise : {timeConverter(props.weatherData.sys.sunrise)}
                      </div>
                      <div className="weather-grid-item">
                        <img src= {visibilitImg} className='small-icon'></img>
                        Visibility : {getVisibility()} km
                      </div>
                      <div className="weather-grid-item">
                        <img src= {sunsetImg} className='small-icon'></img>
                        Sunset : {timeConverter(props.weatherData.sys.sunset)}
                      </div>
                    </div>
                    
                    
                    
                    
                    
                  </>
                  ) : (
                    <p>Loading weather data...</p>
                  )}
          </div>
        </>
    );
}

export default WeatherInfo;

