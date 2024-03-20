// import React, { useEffect, useState, useCallback } from 'react'; //
// import WeatherAPI from "./WeatherAPI"; //
// import axios from 'axios'; //




// import {useState} from 'react';
import Rain from '../assets/rain.png';
import TrianleImg from "../assets/Polygon1.png";
import '../css/hourlyWeather.css'

const length = 8;
const iconArr = ListIcon();
const timeArr = ListTime();
const triangeArr = createTriangeArr();
//const triangeArr = ListTriangle();

// create an array for wether icon depending on the weather on every hour
 function ListIcon(){
    let iconArr = []
    let icon = Rain;
    for(let i = 0; i < length; i++){
        iconArr.push(<img src={icon} alt="rain:" className="hourlyIcon"/>)
        // iconArr.push = getWether(timeArr[i])
    }
    return iconArr;
}

// change weather icon array as an object
const iconObj = iconArr.map(
    (icon, i) => ({
    id: i,
    title: icon
})
);

// create an array for hours to display form the current time
function ListTime (){
    let timeArr = [];
    let startTime = new Date().getHours();
    for(let i = 0; i < length; i++){
        timeArr.push((startTime+i)%24);
    }
    return timeArr;
}

// change time array to object
const timeObj = timeArr.map(
    (time, i) => ({
    id: i,
    title: (time + ":00")
})
);



function createTriangeArr (){
    
    let triangeArr = [];
    let icon = TrianleImg
    let visibleIndex = 0;
    for(let i = 0; i < length; i++){
        if (i !== visibleIndex){
            triangeArr.push(undefined);
        }
        else{
            triangeArr[i] = (i, 0, <img src={icon} alt="triangle" className="triangle"/>);
        }
            
    }
    return triangeArr;
}

// change triangler array to object
const triangleObj = triangeArr.map(
    (figure, i) => ({
    id: i,
    title: figure
})
);


// display weather icons and hours
function DisplayHourly(probs,{onHoursClick}){

    return(
        <div id = "hourlySection">
            <div class = "row">
                {probs.wIcon.map((wIcon) =>(
                    <div class = "column" key={wIcon.id}>
                        {wIcon.title}
                    </div>
                ))}  
            </div>
            <div class = "row">
                {probs.hours.map((hour) =>(
                    <div class = "column">
                    <button class = 'time' key = {hour.id} > 
                        {hour.title}
                    </button>
                    </div>
                ))}  
            </div>
            <div class = "row">
                {probs.triFigure.map((triFigure) =>(
                    <div class = "column">
                    <div class = 'triangle' key = {triFigure.id}> 
                        {triFigure.title}
                    </div>
                    </div>
                ))}  
            </div>

        </div>

    );
}



function Line(){
    return(
        <div id="line"></div>
    );
}



function HourlyWeather(){

// const [city2, setCity2] = useState(''); //
// const [weatherData2, setWeatherData2] = useState(null);  //
// const [alertData2, setAlertData2] = useState([]); //

// const apikey  = 
  

// const fetchData = useCallback(async () => {
    // try {
    //     const response2 = await axios.get(
    //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5b9d26b9c1d259eb06ab78b7d25582f7`
    //     );
    //     setWeatherData2(response2.data);
    //     console.log("weatherData", response.data); //You can see all the weather data in console log
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }, [city]);
    // useEffect(() => {
    //   fetchData();
    //   // axios.get(`https://api.weatherapi.com/v1/forecast.json?key=aec898c8a5b64dc09d0195725241203&q=${city}&aqi=no&alerts=yes`)
    //   // .then(response => setAlertData(response.data.alerts.alert))
    //   // .catch(error => console.error(error));
    // }, [fetchData]);

    // const [index, setIndex] = useState(0);
    // console.log("index", index);
    return(
        <>
        <DisplayHourly
            hours={timeObj}
            wIcon={iconObj}
            triFigure={triangleObj}
            />
        <Line/>
        </>
    );

};

export default HourlyWeather;