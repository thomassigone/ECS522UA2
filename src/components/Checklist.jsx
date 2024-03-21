import React from 'react';
import { Link } from 'react-router-dom';

//navigates to a another component(ChecklistForm) on a new page
function Checklist(){
    return (
        <div className='checklist-box'>
            <Link to="/ChecklistForm" target="_blank">Click here to plan your hike</Link>
        </div>
    );
};
    

export default Checklist;