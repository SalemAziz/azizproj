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
        {showCreateMatch ? 'Cancel' : 'Create Match'} <TbSoccerField className='icoico' />

      </button>
      {showCreateMatch && <CreateMatch />}
    </div>
  );
}

export default Popmtch;
