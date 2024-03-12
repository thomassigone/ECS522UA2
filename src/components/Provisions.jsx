import "../css/provisions.css";

const Provisions = (props) => {
    const { alerts } = props;
    return <div>
        {alerts.length === 0 ? <p id="conditions">Safe Hiking Conditions</p> : <p>There is a weather alert - unsafe!</p>}
        <p>TS - TODO Provisions</p>
    </div>
};

export default Provisions;