function Time(){
    let now = 8;

    return(
        <section>
            <button class = "time">{now+0}:00</button>
            <button class = "time">{now+1}:00</button>
            <button class = "time">{now+2}:00</button>
            <button class = "time">{now+3}:00</button>
            <button class = "time">{now+4}:00</button>
            <button class = "time">{now+5}:00</button>            
            <button class = "time">{now+6}:00</button>
            <button class = "time">{now+7}:00</button> 
        </section>
    );

}

function Line(){
    return(
        <div id="line"></div>
    );
}

function Triangle(){
    return(
        <div id="triangle"></div>
    );
}

function HourlyWeather(){
    return(
        <>
        <Time/>
        <Triangle/>
        <Line/>
        </>
    );

};

export default HourlyWeather;