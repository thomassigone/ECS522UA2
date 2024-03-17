
import locationImg from './assets/locationicon.png'

function Location(props){
    //change the city 
    const handleCityChange = (e) => {
        props.setCity(e.target.value);
    }

    return(
        <>
            <div className='location-box'>
                <img src={locationImg} alt="Location:" className='location-icon'/>
                <input className='location'
                            type="text"
                            placeholder="Enter Location"
                            value={props.city}
                            onChange={handleCityChange}
                            >
                </input>
            </div>
        </>
    );
}

export default Location;