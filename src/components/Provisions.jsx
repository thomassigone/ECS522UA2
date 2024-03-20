import "../css/provisions.css";
import hikingDangerImg from "../assets/hiking-danger.svg";
import hikingSafeImg from "../assets/hiking-safe.svg";

// Mock data object to show a severe weather alert when rendered
const mockAlertData = {
    state: "Severe",
    title: "Flood Alert"
};

// This is the main function that renders the provisions container div that contains the alert information
// Hiking unadvised is rendered conditionally based on if the state of the alert information is "Severe"
// The margin-title id is only added if the state is not severe as it means the margin for the title needs to be adjusted accordinly in the css

// TS: Need to change view details href to link to somewhere
const getProvisionContainer = (state, title, img) => {
     return <div id="provisions-container">
        <img id="hiking-img" src={img}></img>
        <div>
            {state === "Severe" ? <p id="severe-alert">Hiking unadvised</p> : ''} 
            <p className="title" id={state !== "Severe" ? 'margin-title':''}>{title}</p>
            <a id="view-details-link" target="_blank" href="https://lighthikinggear.com/blogs/hiking/a-guide-to-hiking-gear-for-every-weather">View details &gt;</a> 
        </div>
     </div>
};


// Render different alerts based on the data returned by the API (if the alert object is empty, then hiking is safe)
// Render the mock alert data only if showMockDataAlert is set to true when passed in props
const Provisions = (props) => {
    const { alert, showMockDataAlert } = props;
    return <div id="test">
        {
            showMockDataAlert ? getProvisionContainer(mockAlertData.state, mockAlertData.title, hikingDangerImg) : 
            (
               Object.keys(alert).length === 0 ? getProvisionContainer("Safe", "Safe Conditions", hikingSafeImg) : getProvisionContainer(alert.severity,  alert.event, hikingDangerImg)
            )
        }
    </div>
};

export default Provisions;

