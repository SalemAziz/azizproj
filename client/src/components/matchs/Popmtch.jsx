import React, { useState } from 'react';
import CreateMatch from "./CreateMatch";
import "./mtch.css";
import { TbSoccerField } from "react-icons/tb";



function Popmtch() {
  const [showCreateMatch, setShowCreateMatch] = useState(false);

  const toggleCreateMatch = () => {
    setShowCreateMatch(prevState => !prevState);
  };

  return (
    <div>
      <button className='popmtch' onClick={toggleCreateMatch}>
        <span>
        {showCreateMatch ? 'Cancel' : 'Create Match'} 
        </span>

      </button>
      {showCreateMatch && <CreateMatch />}
    </div>
  );
}

export default Popmtch;
