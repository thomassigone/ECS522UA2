import {useState} from 'react';
import Rain from '../assets/rain.png';
import TrianleImg from "../assets/Polygon1.png";

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
    let visibleIndex = 4;
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

console.log("Triangle", triangeArr)

// display weather icons and hours
function DisplayHourly(probs){

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
                    <button class = 'time' key = {hour.id}> 
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