import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../css/hourlyWeather.css';

import Rain from '../assets/rain.png';
import Snow from '../assets/snow.png';
import Cloud from '../assets/cloudimg.png';
import Strome from '../assets/storm.png';
import Sunny from '../assets/sunny.png'


function HourlyWeather({city}){

    const [hourlyData, setHourlyData] = useState(null);
    const length = 8;

    // fetch hourly forcast data from API
    const fetchData = useCallback(async () => {
        try {
          const response = await axios.get(
            `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=2d8574f0c9e529f4c795e6b8e3ac25ef`
          );
          setHourlyData(response.data.list);
          console.log("response data:", response.data); //You can see all the weather data in console log
        } catch (error) {
          console.error(error);
        }
    }, [city]);
  
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    // create an array of wether icon using feched weather data on every hour
    function HourlyForcastIcons(){

        //create a new array to keep hourly forcast icons
        const iconArr = new Array(length);

        if(hourlyData){
            console.log("hourlyData:", hourlyData);
            // add icons to the array
            for(let i = 0; i < length; i++){
                let hourlyMainWeather = hourlyData[i].weather[0].main;
                
                //let hourlyMainWeather = "Rain fall"; // for test perporse 
                console.log("hourly main weather: ", hourlyMainWeather);

                if(hourlyMainWeather.includes('Rain')){
                    iconArr[i]=(<img src={Rain} alt="rain" className="hourlyIcon"/>);
                }
                else if(hourlyMainWeather.includes('Snow')){
                    iconArr[i]=(<img src={Snow} alt="snow" className="hourlyIcon"/>);
                }
                else if(hourlyMainWeather.includes('Cloud')){
                    iconArr[i]=(<img src={Cloud} alt="cloud" className="hourlyIcon"/>);
                }
                else if(hourlyMainWeather.includes('Strome')){
                    iconArr[i]=(<img src={Strome} alt="strome" className="hourlyIcon"/>);
                }
                else if(hourlyMainWeather.includes('Sunny')){
                    iconArr[i]=(<img src={Sunny} alt="sunny" className="hourlyIcon"/>);
                }
                else{
                    iconArr[i]=(<img src={Sunny} alt="sunny" className="hourlyIcon"/>);
                }
            }

            // change weather icon array to an object
            const iconObj = iconArr.map(
                (icon, i) => ({
                id: i,
                title: icon
                })
            );
            
            // display hourly forcast icons
            return(
                <div className = "row">
                        {iconObj.map((wIcon) =>(
                        <div className = "column" key={wIcon.id}>
                            {wIcon.title}
                        </div>
                    ))}
                </div>
            );
        }
        // Incase data is not available display loarding message
        else{
            console.log("Hourly forcast loading...");
            return(
            <p>Loading hourly forcast...</p>
            );
        }

    }

function HourlyTemp(){
    const tempArr = new Array(length);
    for(let i = 0; i < length; i++){
        let hourlyTemerature = hourlyData[i].main.temp;
        console.log("hourly temp: ", hourlyTemerature);
        tempArr[i]= Math.round(parseInt(hourlyTemerature)) + " °";
    }

    // change temperature array to object
    const tempObj = tempArr.map(
        (temp, i) => ({
        id: i,
        title: (temp)
        })
    );

    return(
        <div className = "row">
            {tempObj.map((temp) =>(
                <div className = "column">
                <button className = 'time' key = {temp.id} > 
                    {temp.title}
                </button>
                </div>
            ))}  
        </div>

    );
}


    
// create an array for hours and display form the current hour
function ListHours (){
    let timeArr = new Array(length);
    let startTime = new Date().getHours();
    timeArr[0] = "Now";
    for(let i = 1; i < length; i++){
        timeArr[i] = ((startTime+i)%24) + ":00";
    }

    // change time array to object
    const timeObj = timeArr.map(
        (time, i) => ({
        id: i,
        title: (time)
        })
    );

    // display Hours
    return(
        <div className = "row">
            {timeObj.map((hour) =>(
                <div className = "column">
                <button className = 'time' key = {hour.id} > 
                    {hour.title}
                </button>
                </div>
            ))}  
        </div>

    );

}





return(
    <>
        <HourlyForcastIcons/>
        <HourlyTemp/>
        <ListHours/>
    </>
    );
}

export default HourlyWeather;