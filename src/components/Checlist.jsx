import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Checklist(){
    
    const navigate = useNavigate();
    

    const handleClick = () => {
        navigate('/ChecklistForm');; 
    };

    return (
        <div className='checklist-box'>
            <Link to="/ChecklistForm" target="_blank">Click here to plan your hike</Link>
        </div>
    );
};
    

export default Checklist;