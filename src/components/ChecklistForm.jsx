import '../css/checklist.css';
import React, { useState } from 'react';

function ChecklistForm(){
    const [checkedCount, setCheckedCount] = useState(0);
    const [message, setMessage] = useState("Click on submit to see how prepared you are");
    const [messageColour, setMessageColour] = useState("white");

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
        setCheckedCount(checkedCount + 1);
        } else {
        setCheckedCount(checkedCount - 1);
        }
    };


    const checkCount = () => {
        if (checkedCount === 0) {
            setMessage("You are not ready for hiking!!!!");
            setMessageColour("red");
          } else if (checkedCount < 5) {
            setMessage("You need more preperation for hiking.");
            setMessageColour("orange");  
          } else if (checkedCount < 8) {
            setMessage("You are almost ready for hiking.");
            setMessageColour("orange"); 
          } else {
            setMessage("Well Done! You are fully prepared for hiking");
            setMessageColour("green"); 
          }
    }

    
    return(<>
        <div className='checklist-body'>
            <h1 className='checklist-header'>Hiking Checklist</h1>
            <p>Tick all the items you have to see how prepared you are for hiking:</p>
            <div className='checklist'>
                <input type="checkbox" id="checkbox1" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox1">Hiking Pack</label>
                <br />
                <input type="checkbox" id="checkbox2" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox2">Weather-appropriate clothing</label>
                <br />
                <input type="checkbox" id="checkbox3" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox3">Hiking footwear</label>
                <br />
                <input type="checkbox" id="checkbox4" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox1">Plenty of food</label>
                <br />
                <input type="checkbox" id="checkbox5" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox1">Plenty of water</label>
                <br />
                <input type="checkbox" id="checkbox6" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox1">Navigation tools (map/compass etc.)</label>
                <br />
                <input type="checkbox" id="checkbox7" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox1">First-aid kit</label>
                <br />
                <input type="checkbox" id="checkbox8" className='checkbox' onChange={handleCheckboxChange} />
                <label htmlFor="checkbox1">Knife or multi-tool</label>
                <br />
            </div>
            <input type="button" className='submit-button' value="Submit" onClick={checkCount}/>
            <p style={{ color: messageColour }} className='output'>{message}</p>
            
        </div>
    </>);
}

export default ChecklistForm;